// models/sellerModel.js

const db = require('../../config');


class SellerModel {
  static async findSellerById(id) {
    const [seller] = await db.query('SELECT * FROM seller WHERE id = ?', [id]);
    return seller.length > 0 ? seller[0] : null;
  }

  static async moveToTrash(id) {
    await db.query('INSERT INTO Trashseller SELECT * FROM seller WHERE id = ?', [id]);
  }

  static async deleteSeller(id) {
    await db.query('DELETE FROM seller WHERE id = ?', [id]);
  }
}

module.exports = SellerModel;
