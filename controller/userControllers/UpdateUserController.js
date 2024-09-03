const User = require('../../models/userModels/UpdateUserModel');

class UserUpdateController {
    static async updateUser(req, res) {
        const { userId, username, email, role, password } = req.body;

        try {
            await User.updateUser(userId, username, email, role, password);
            const updatedUser = await User.getUserById(userId);
            res.status(200).json(updatedUser);
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Failed to update user.' });
        }
    }
}

module.exports = UserUpdateController;
