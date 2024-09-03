const db = require('../../config/db');

class Seller {
    static create(sellerData) {
        const query = `INSERT INTO sellers SET ?`;
        console.log("Seller Data:", sellerData);
        return db.query(query, sellerData);
    }
}

module.exports = Seller;
