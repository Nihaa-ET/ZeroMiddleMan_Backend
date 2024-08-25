// models/sellerModel.js
const db = require('../../config/db');


// Function to insert multiple sellers into the database
const insertSellers = async (sellers) => {
    // Ensure sellers is an array
    if (!Array.isArray(sellers)) {
        throw new Error('Expected sellers to be an array');
    }

    // SQL query for inserting data into the seller table
    const sql = `
        INSERT INTO seller (
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
        ) VALUES ?
    `;

    // Map the sellers array to extract the relevant fields for each seller
    const values = sellers.map(seller => [
        seller.companyName,
        seller.contactPersonName,
        seller.companyShortDescription,
        seller.email,
        seller.phoneNumber,
        seller.alternativeNumber,
        seller.companyAddressStreet,
        seller.companyAddressLocality,
        seller.companyAddressCity,
        seller.companyAddressPIN,
        seller.companyAddressState,
        seller.companyAddressCountry,
        seller.gstVatTaxNumber,
        seller.yearOfIncorporation,
        seller.totalNoOfEmployees,
        seller.businessWebsiteURL,
        seller.majorBusinessType
    ]);

    try {
        // Execute the query and return the result
        const [result] = await db.query(sql, [values]);
        console.log('Insert result:', result);
        return result;
    } catch (error) {
        console.error('Error executing insert query:', error);
        throw new Error('Error inserting sellers into the database');
    }
};

// Function to retrieve all sellers from the database
const getSellers = async () => {
    const sql = 'SELECT * FROM seller';
    try {
        const [results] = await db.query(sql);
        console.log('Retrieved sellers:', results);
        return results;
    } catch (error) {
        console.error('Error executing select query:', error);
        throw new Error('Error fetching sellers from the database');
    }
};

module.exports = {
    insertSellers,
    getSellers
};
