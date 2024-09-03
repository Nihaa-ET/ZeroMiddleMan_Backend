const db = require('../../config/db');

class ProductModel {
    static create(productData) {
        const query = `INSERT INTO products SET ?`;
        return db.query(query, productData);
    }

    static getAll() {
        const query = `SELECT * FROM products`;
        return db.query(query);
    }
}

module.exports = ProductModel;
