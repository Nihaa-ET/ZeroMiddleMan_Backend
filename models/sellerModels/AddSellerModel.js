const db = require('../../config/db');


const createSeller = async (sellerData) => {
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

    const [result] = await db.execute(`
        INSERT INTO seller (
            companyName, contactPersonName, companyShortDescription, email, phoneNumber,
            alternativeNumber, companyAddressStreet, companyAddressLocality, companyAddressCity,
            companyAddressPIN, companyAddressState, companyAddressCountry, gstVatTaxNumber,
            yearOfIncorporation, totalNoOfEmployees, businessWebsiteURL, majorBusinessType
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        companyName, contactPersonName, companyShortDescription, email, phoneNumber,
        alternativeNumber, companyAddressStreet, companyAddressLocality, companyAddressCity,
        companyAddressPIN, companyAddressState, companyAddressCountry, gstVatTaxNumber,
        yearOfIncorporation, totalNoOfEmployees, businessWebsiteURL, majorBusinessType
    ]);

    return result;
};

const getAllSellers = async () => {
    const [rows] = await db.execute('SELECT * FROM seller');
    return rows;
};

// Export functions
module.exports = {
    createSeller,
    getAllSellers
};
