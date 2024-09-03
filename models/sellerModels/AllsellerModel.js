const db = require('../../config/db');

class SellerModel {
  // Fetch all sellers (excluding deleted)
  static getAllSellers() {
    const query = 'SELECT id, company_name, contact_person_name, company_short_description, email, phone_number, alternative_number, street, locality, city, pin, state, country, gst_vat_tax_number, year_of_incorporation, total_employees, business_website_url, major_business_type FROM sellers WHERE deleted = 0';
    return db.query(query);
  }

  // Fetch a seller by ID (if not deleted)
  static getSellerById(id) {
    const query = 'SELECT id, company_name, contact_person_name, company_short_description, email, phone_number, alternative_number, street, locality, city, pin, state, country, gst_vat_tax_number, year_of_incorporation, total_employees, business_website_url, major_business_type FROM sellers WHERE id = ? AND deleted = 0';
    return db.query(query, [id]);
  }

  // Update a seller by ID
  static updateSeller(id, sellerData) {
    const query = 'UPDATE sellers SET ? WHERE id = ? AND deleted = 0';
    return db.query(query, [sellerData, id]);
  }

  // Disable a seller by ID (soft delete)
  static async disableSeller(id) {
    try {
      // Soft delete the seller
      const softDeleteQuery = 'UPDATE sellers SET deleted = TRUE WHERE id = ?';
      await db.query(softDeleteQuery, [id]);

      return { message: 'Seller disabled successfully' };
    } catch (error) {
      throw new Error(`Error disabling seller: ${error.message}`);
    }
  }

  // Fetch all disabled sellers
 // Model: ProductSellerModel.js

 static async getAllDeletedProductSellers() {
  const query = `
    SELECT 
        p.id AS product_id, 
        p.product_name, 
        p.category_of_product, 
        p.hsn_code, 
        p.indicative_price_range, 
        p.short_description AS product_description, 
        p.monthly_production_capacity, 
        s.id AS seller_id, 
        s.company_name, 
        s.contact_person_name, 
        s.email, 
        s.phone_number, 
        s.street, 
        s.locality, 
        s.city, 
        s.pin, 
        s.state, 
        s.country, 
        s.gst_vat_tax_number, 
        s.year_of_incorporation, 
        s.total_employees, 
        s.business_website_url, 
        s.major_business_type
    FROM 
        products p
    INNER JOIN 
        sellers s
    ON 
        p.seller_id = s.id
    WHERE 
        p.deleted = 1 AND s.deleted = 1
  `;
  
  try {
    const [rows] = await db.query(query); // This will only extract the data rows
    return rows; // Return only the data rows, not the metadata
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // Re-throw the error to handle it in the controller
  }
}
static async updateDeletedFieldForSellersAndProducts(ids) {
  // Convert the array of IDs into a comma-separated string
  const idsString = ids.join(',');

  const query = `
    UPDATE sellers s
    INNER JOIN products p ON s.id = p.seller_id
    SET s.deleted = 0, p.deleted = 0
    WHERE s.deleted = 1 AND p.deleted = 1 AND s.id IN (${idsString});
  `;
  
  try {
    const [result] = await db.query(query);
    return result; // Return the result of the query execution
  } catch (error) {
    console.error('Error updating deleted field:', error);
    throw error; // Re-throw the error to handle it in the controller
  }
}
static async deleteSellersAndProductsByIds(ids) {
  // Convert the array of IDs into a comma-separated string
  const idsString = ids.join(',');

  const query = `
    DELETE s, p
    FROM sellers s
    INNER JOIN products p ON s.id = p.seller_id
    WHERE s.id IN (${idsString});
  `;
  
  try {
    const [result] = await db.query(query);
    return result; // Return the result of the query execution
  } catch (error) {
    console.error('Error deleting rows:', error);
    throw error; // Re-throw the error to handle it in the controller
  }
}
// UserModel.js
static async deleteSellersByIds(ids) {
  // Convert the array of IDs into a comma-separated string
  const idsString = ids.join(',');

  const query = `
    DELETE FROM users
    WHERE id IN (${idsString});
  `;
  
  try {
    const [result] = await db.query(query);
    return result; // Return the result of the query execution
  } catch (error) {
    console.error('Error deleting users:', error);
    throw error; // Re-throw the error to handle it in the controller
  }
}



}

module.exports = SellerModel;
