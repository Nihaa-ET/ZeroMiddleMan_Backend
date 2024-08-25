// controllers/sellerController.js
const { insertSellers, getSellers } = require('../../models/sellerModels/ImportExportModel');
const ExcelJS = require('exceljs');

// Controller function to upload sellers
exports.uploadSellers = async (req, res) => {
    const sellers = req.body;

    // Log incoming data for debugging
    console.log('Received sellers data:', sellers);

    try {
        await insertSellers(sellers);
        res.send('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data: ' + err.message);
    }
};

// Controller function to get sellers
exports.getSellers = async (req, res) => {
    try {
        const results = await getSellers();
        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data: ' + err.message);
    }
};

// Controller function to download sellers
exports.downloadSellers = async (req, res) => {
    try {
        const results = await getSellers();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sellers');

        // Define worksheet columns based on your table structure
        worksheet.columns = [
            { header: 'companyName', key: 'companyName', width: 30 },
            { header: 'contactPersonName', key: 'contactPersonName', width: 30 },
            { header: 'companyShortDescription', key: 'companyShortDescription', width: 30 },
            { header: 'email', key: 'email', width: 30 },
            { header: 'phoneNumber', key: 'phoneNumber', width: 20 },
            { header: 'alternativeNumber', key: 'alternativeNumber', width: 20 },
            { header: 'companyAddressStreet', key: 'companyAddressStreet', width: 30 },
            { header: 'companyAddressLocality', key: 'companyAddressLocality', width: 30 },
            { header: 'companyAddressCity', key: 'companyAddressCity', width: 20 },
            { header: 'companyAddressPIN', key: 'companyAddressPIN', width: 10 },
            { header: 'companyAddressState', key: 'companyAddressState', width: 20 },
            { header: 'companyAddressCountry', key: 'companyAddressCountry', width: 20 },
            { header: 'gstVatTaxNumber', key: 'gstVatTaxNumber', width: 30 },
            { header: 'yearOfIncorporation', key: 'yearOfIncorporation', width: 20 },
            { header: 'totalNoOfEmployees', key: 'totalNoOfEmployees', width: 20 },
            { header: 'businessWebsiteURL', key: 'businessWebsiteURL', width: 30 },
            { header: 'companyLogo', key: 'companyLogo', width: 30 },
            { header: 'majorBusinessType', key: 'majorBusinessType', width: 20 }
        ];

        // Add rows to the worksheet
        results.forEach(seller => {
            worksheet.addRow({
                companyName: seller.companyName,
                contactPersonName: seller.contactPersonName,
                companyShortDescription: seller.companyShortDescription,
                email: seller.email,
                phoneNumber: seller.phoneNumber,
                alternativeNumber: seller.alternativeNumber,
                companyAddressStreet: seller.companyAddressStreet,
                companyAddressLocality: seller.companyAddressLocality,
                companyAddressCity: seller.companyAddressCity,
                companyAddressPIN: seller.companyAddressPIN,
                companyAddressState: seller.companyAddressState,
                companyAddressCountry: seller.companyAddressCountry,
                gstVatTaxNumber: seller.gstVatTaxNumber,
                yearOfIncorporation: seller.yearOfIncorporation,
                totalNoOfEmployees: seller.totalNoOfEmployees,
                businessWebsiteURL: seller.businessWebsiteURL,
                companyLogo: seller.companyLogo,
                majorBusinessType: seller.majorBusinessType
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=sellers.xlsx'
        );

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (err) {
        console.error('Error downloading data:', err);
        res.status(500).send('Error downloading data: ' + err.message);
    }
};
