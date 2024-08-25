const db = require('../../config/db');

class SellerModel {
  // Fetch trashed sellers
  static async getTrashedSellers() {
    try {
      const [rows] = await db.query('SELECT * FROM disableseller');
      return rows;
    } catch (error) {
      throw new Error('Error fetching trashed sellers: ' + error.message);
    }
  }

  // Restore a seller from disablesellers to sellers
  static async restoreSeller(id) {
    try {
      // 1. Fetch the seller data from disablesellers
      const [sellerRows] = await db.query('SELECT * FROM disableseller WHERE id = ?', [id]);
      if (sellerRows.length === 0) {
        throw new Error('Seller not found in disablesellers');
      }
      
      const sellerData = sellerRows[0];

      // 2. Insert the seller data into the sellers table
      const {
        companyName,
        contactPersonName,
        companyShortDescription,
        email,
        phoneNumber,
        alternativeNumber,
        companyAddressStreet,
        companyAddressLocality,
        companyAddressCity,
        companyAddressPIN,
        companyAddressState,
        companyAddressCountry,
        gstVatTaxNumber,
        yearOfIncorporation,
        totalNoOfEmployees,
        businessWebsiteURL,
        majorBusinessType
      } = sellerData;

      await db.query(
        `INSERT INTO seller (
          companyName, contactPersonName, companyShortDescription, email, phoneNumber, alternativeNumber,
          companyAddressStreet, companyAddressLocality, companyAddressCity, companyAddressPIN, companyAddressState,
          companyAddressCountry, gstVatTaxNumber, yearOfIncorporation, totalNoOfEmployees, businessWebsiteURL,
          majorBusinessType
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          companyName,
          contactPersonName,
          companyShortDescription,
          email,
          phoneNumber,
          alternativeNumber,
          companyAddressStreet,
          companyAddressLocality,
          companyAddressCity,
          companyAddressPIN,
          companyAddressState,
          companyAddressCountry,
          gstVatTaxNumber,
          yearOfIncorporation,
          totalNoOfEmployees,
          businessWebsiteURL,
          majorBusinessType
        ]
      );

      // 3. Delete the seller from disablesellers
      await db.query('DELETE FROM disableseller WHERE id = ?', [id]);

      return true;
    } catch (error) {
      throw new Error('Error restoring seller: ' + error.message);
    }
  }

  // Permanently delete seller from disablesellers
  static async deleteSeller(id) {
    try {
      const [deleteResult] = await db.query('DELETE FROM disableseller WHERE id = ?', [id]);
      return deleteResult.affectedRows > 0;
    } catch (error) {
      throw new Error('Error deleting seller: ' + error.message);
    }
  }
}

module.exports = SellerModel;
