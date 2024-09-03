// models/ActiveUserModel.js
const db = require('../../config/db');

class ActiveUserModel {
  static getAllUsers() {
    return db.query('SELECT id, username,password, email, role FROM users WHERE role != "superadmin" AND role != "admin"');
  }

  static async disableUser(userId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert into disableUsers, excluding superadmin and admin
      await connection.query(`
        INSERT INTO disableusers (id, username, password, email, role)
        SELECT id, username, password, email, role 
        FROM users 
        WHERE id = ? AND role != "superadmin" AND role != "admin"
      `, [userId]);

      // Delete from users, excluding superadmin and admin
      await connection.query('DELETE FROM users WHERE id = ? AND role != "superadmin" AND role != "admin"', [userId]);

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = ActiveUserModel;
