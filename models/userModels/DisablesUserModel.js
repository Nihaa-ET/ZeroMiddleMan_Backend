const db = require('../../config/db');

class DisabledUserModel {
  static getAllDisabledUsers() {
    return db.query('SELECT id, username, password, email, role FROM disableusers');
  }

  static async activateUser(userId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert into users
      await connection.query(`
        INSERT INTO users (id, username, password, email, role)
        SELECT id, username, password, email, role FROM disableusers WHERE id = ?
      `, [userId]);

      // Delete from disableusers
      await connection.query('DELETE FROM disableusers WHERE id = ?', [userId]);

      await connection.commit();
    } catch (err) {
      console.error('Error during activateUser transaction:', err);
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
  static async deleteUser(userId) {
    return db.query('DELETE FROM disableusers WHERE id = ?', [userId]);
  }
  
}

module.exports = DisabledUserModel;
