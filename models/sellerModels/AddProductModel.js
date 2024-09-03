const db = require('../../config/db');

class Product {
    static create(productData) {
        const query = `INSERT INTO products SET ?`;
        return db.query(query, productData);
    }
}

module.exports = Product;
