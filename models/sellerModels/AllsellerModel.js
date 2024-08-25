const db = require('../../config/db');

class SellerModel {
  // Method to fetch all sellers
  static async getAllSellers() {
    const query = `SELECT * FROM seller`;
    return new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  // Method to fetch a seller by ID
  static async getSellerById(id) {
    const query = `SELECT * FROM seller WHERE id = ?`;
    console.log('Running query:', query, 'with ID:', id); // Debugging line
    try {
      const [result] = await db.query(query, [id]);
      console.log('Query result:', result); // Debugging line
      return result[0];
    } catch (error) {
      console.error('Query error:', error); // Debugging line
      throw error;
    }
  }

  // Method to update a seller by ID
  static async updateSeller(id, sellerData) {
    try {
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

        const [result] = await db.query(`
            UPDATE seller SET
                companyName = ?,
                contactPersonName = ?,
                companyShortDescription = ?,
                email = ?,
                phoneNumber = ?,
                alternativeNumber = ?,
                companyAddressStreet = ?,
                companyAddressLocality = ?,
                companyAddressCity = ?,
                companyAddressPIN = ?,
                companyAddressState = ?,
                companyAddressCountry = ?,
                gstVatTaxNumber = ?,
                yearOfIncorporation = ?,
                totalNoOfEmployees = ?,
                businessWebsiteURL = ?,
                majorBusinessType = ?
            WHERE id = ?
        `, [
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
            majorBusinessType,
            id
        ]);

        return result;
    } catch (error) {
        throw new Error('Error updating seller');
    }
}

  // Method to disable and delete a seller by ID
  static async disableAndDeleteSeller(id) {
    const disableQuery = `
      INSERT INTO disableseller (
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
      ) 
      SELECT 
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
      FROM seller
      WHERE id = ?
    `;

    const deleteQuery = `DELETE FROM seller WHERE id = ?`;

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert into disableseller
      const [disableResult] = await connection.query(disableQuery, [id]);
      if (disableResult.affectedRows === 0) {
        throw new Error('Seller not found');
      }

      // Delete from seller
      const [deleteResult] = await connection.query(deleteQuery, [id]);
      if (deleteResult.affectedRows === 0) {
        throw new Error('Seller not found');
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Method to delete a disabled seller by ID
  // Uncomment if needed
  // static async deleteDisabledSeller(id) {
  //   const query = `DELETE FROM disableseller WHERE id = ?`;
  //   return new Promise((resolve, reject) => {
  //     db.query(query, [id], (error, result) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       resolve(result.affectedRows > 0);
  //     });
  //   });
  // }
}

module.exports = SellerModel;
