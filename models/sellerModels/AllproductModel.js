const db = require('../../config/db');

class ProductModel {
    // Fetch all products (excluding deleted)
    static getAllProducts() {
        const query = 'SELECT * FROM products WHERE deleted = 0';
        return db.query(query);
    }

    // Fetch a product by ID (if not deleted)
    static getProductById(id) {
        const query = 'SELECT * FROM products WHERE id = ? AND deleted = 0';
        return db.query(query, [id]);
    }

    // Update a product by ID
    static updateProduct(id, productData) {
        const query = 'UPDATE products SET ? WHERE id = ? AND deleted = 0';
        return db.query(query, [productData, id]);
    }

    // Disable a product by ID (soft delete)
    static async disableProduct(id) {
        try {
            // Soft delete the product
            const softDeleteQuery = 'UPDATE products SET deleted = TRUE WHERE id = ?';
            await db.query(softDeleteQuery, [id]);
    
            return { message: 'Product disabled successfully' };
        } catch (error) {
            throw new Error(`Error disabling product: ${error.message}`);
        }
    }
    static getAllDeletedProducts() {
        const query = 'SELECT * FROM products WHERE deleted = 1';
        return db.query(query);
    }
    
    static async restoreProduct(id) {
        const query = 'UPDATE products SET deleted = FALSE WHERE id = ? AND deleted = TRUE';
        return db.query(query, [id]);
      }
    
      // Restore multiple products by IDs
      static async restoreProducts(ids) {
        const query = 'UPDATE products SET deleted = FALSE WHERE id IN (?) AND deleted = TRUE';
        return db.query(query, [ids]);
      }
}

module.exports = ProductModel;
