const db = require('../../config/db');
const bcrypt = require('bcryptjs');

class User {
    // Method to update user details
    static async updateUser(userId, username, email, role, newPassword = null) {
        try {
            let updateFields = [];
            let values = [userId];

            if (username) {
                updateFields.push('username = ?');
                values.unshift(username);
            }
            if (email) {
                updateFields.push('email = ?');
                values.splice(1, 0, email);
            }
            if (role) {
                updateFields.push('role = ?');
                values.splice(2, 0, role);
            }
            if (newPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                updateFields.push('password = ?');
                values.splice(3, 0, hashedPassword);
            }

            if (updateFields.length === 0) {
                throw new Error('No fields to update.');
            }

            const updateQuery = `
                UPDATE users
                SET ${updateFields.join(', ')}
                WHERE id = ?
            `;

            await db.query(updateQuery, values);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    // Method to get a user by ID
    static async getUserById(userId) {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await db.query(query, [userId]);
            if (rows.length === 0) {
                throw new Error('User not found.');
            }
            return rows[0];
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}

module.exports = User;
