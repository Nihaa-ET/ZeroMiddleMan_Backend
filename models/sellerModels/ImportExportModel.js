const db = require('../../config/db');

// Function to insert multiple sellers and their products into the database
const insertSellersAndProducts = async (sellers, products) => {
    if (!Array.isArray(sellers) || !Array.isArray(products)) {
        throw new Error('Expected sellers and products to be arrays');
    }

    const sellerSql = `
        INSERT INTO sellers (
            company_name, 
            contact_person_name, 
            company_short_description, 
            email, 
            phone_number, 
            alternative_number, 
            street, 
            locality, 
            city, 
            pin, 
            state, 
            country, 
            gst_vat_tax_number, 
            year_of_incorporation, 
            total_employees, 
            business_website_url, 
            major_business_type
        ) VALUES ?
    `;

    const productSql = `
        INSERT INTO products (
            seller_id, 
            product_name, 
            category_of_product, 
            hsn_code, 
            indicative_price_range, 
            short_description, 
            monthly_production_capacity
        ) VALUES ?
    `;

    const sellerValues = sellers.map(seller => [
        seller.company_name,
        seller.contact_person_name,
        seller.company_short_description,
        seller.email,
        seller.phone_number,
        seller.alternative_number,
        seller.street,
        seller.locality,
        seller.city,
        seller.pin,
        seller.state,
        seller.country,
        seller.gst_vat_tax_number,
        seller.year_of_incorporation,
        seller.total_employees,
        seller.business_website_url,
        seller.major_business_type,
    ]);

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Insert sellers and get their IDs
        const [result] = await connection.query(sellerSql, [sellerValues]);
        const sellerIds = Array.from({ length: sellers.length }, (_, i) => result.insertId + i);

        // Associate products with the correct seller_id
        const productValues = products.map((product, index) => [
            sellerIds[index], // Assuming products are in the same order as sellers
            product.product_name,
            product.category_of_product,
            product.hsn_code,
            product.indicative_price_range,
            product.short_description,
            product.monthly_production_capacity,
        ]);

        // Insert products
        await connection.query(productSql, [productValues]);

        await connection.commit();
        return sellerIds;
    } catch (error) {
        await connection.rollback();
        console.error('Error inserting data:', error);
        throw new Error('Error inserting sellers and products into the database');
    } finally {
        connection.release();
    }
};

module.exports = {
    insertSellersAndProducts
};

// Function to retrieve all sellers and their products from the database
const getSellersAndProducts = async () => {
    const sellerSql = 'SELECT * FROM sellers WHERE deleted = 0';
    const productSql = 'SELECT * FROM products WHERE deleted = 0';

    try {
        const [sellers] = await db.query(sellerSql);
        const [products] = await db.query(productSql);

        // Combine sellers and their products
        const data = sellers.map(seller => ({
            ...seller,
            products: products.filter(product => product.seller_id === seller.id),
        }));

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching sellers and products from the database');
    }
};

module.exports = {
    insertSellersAndProducts,
    getSellersAndProducts,
};
