const { insertSellersAndProducts, getSellersAndProducts } = require('../../models/sellerModels/ImportExportModel');
const ExcelJS = require('exceljs');

// Controller function to upload sellers and products
exports.uploadSellersAndProducts = async (req, res) => {
    console.log('Received data:', req.body);

    // Extract data array
    const data = req.body.data;

    // Separate sellers and products into distinct arrays
    const sellers = data.map(item => ({
        company_name: item.company_name,
        contact_person_name: item.contact_person_name,
        company_short_description: item.company_short_description,
        email: item.email,
        phone_number: item.phone_number,
        alternative_number: item.alternative_number,
        street: item.street,
        locality: item.locality,
        city: item.city,
        pin: item.pin,
        state: item.state,
        country: item.country,
        gst_vat_tax_number: item.gst_vat_tax_number,
        year_of_incorporation: item.year_of_incorporation,
        total_employees: item.total_employees,
        business_website_url: item.business_website_url,
        major_business_type: item.major_business_type
    }));

    const products = data.map(item => ({
        product_name: item.product_name,
        category_of_product: item.category_of_product,
        hsn_code: item.hsn_code,
        indicative_price_range: item.indicative_price_range,
        short_description: item.short_description,
        monthly_production_capacity: item.monthly_production_capacity
    }));

    try {
        const sellerIds = await insertSellersAndProducts(sellers, products);
        res.send(`Data inserted successfully. Seller IDs: ${sellerIds.join(', ')}`);
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data: ' + err.message);
    }
};



// Controller function to get sellers and products
exports.getSellersAndProducts = async (req, res) => {
    try {
        const results = await getSellersAndProducts();
        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data: ' + err.message);
    }
};

// Controller function to download sellers and products
exports.downloadSellersAndProducts = async (req, res) => {
    try {
        const results = await getSellersAndProducts();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sellers and Products');

        // Define columns for combined data
        worksheet.columns = [
            { header: 'company_name', key: 'company_name', width: 30 },
            { header: 'contact_person_name', key: 'contact_person_name', width: 30 },
            { header: 'company_short_description', key: 'company_short_description', width: 30 },
            { header: 'email', key: 'email', width: 30 },
            { header: 'phone_number', key: 'phone_number', width: 20 },
            { header: 'alternative_number', key: 'alternative_number', width: 20 },
            { header: 'street', key: 'street', width: 30 },
            { header: 'locality', key: 'locality', width: 30 },
            { header: 'city', key: 'city', width: 20 },
            { header: 'pin', key: 'pin', width: 10 },
            { header: 'state', key: 'state', width: 20 },
            { header: 'country', key: 'country', width: 20 },
            { header: 'gst_vat_tax_number', key: 'gst_vat_tax_number', width: 30 },
            { header: 'year_of_incorporation', key: 'year_of_incorporation', width: 20 },
            { header: 'total_employees', key: 'total_employees', width: 20 },
            { header: 'business_website_url', key: 'business_website_url', width: 30 },
            { header: 'major_business_type', key: 'major_business_type', width: 20 },
            { header: 'product_name', key: 'product_name', width: 30 },
            { header: 'category_of_product', key: 'category_of_product', width: 30 },
            { header: 'hsn_code', key: 'hsn_code', width: 20 },
            { header: 'indicative_price_range', key: 'indicative_price_range', width: 20 },
            { header: 'short_description', key: 'short_description', width: 30 },
            { header: 'monthly_production_capacity', key: 'monthly_production_capacity', width: 30 },
        ];

        // Add rows to the worksheet
        results.forEach(seller => {
            seller.products.forEach(product => {
                worksheet.addRow({
                    ...seller,
                    product_name: product.product_name,
                    category_of_product: product.category_of_product,
                    hsn_code: product.hsn_code,
                    indicative_price_range: product.indicative_price_range,
                    short_description: product.short_description,
                    monthly_production_capacity: product.monthly_production_capacity,
                });
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=sellers_and_products.xlsx'
        );

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (err) {
        console.error('Error downloading data:', err);
        res.status(500).send('Error downloading data: ' + err.message);
    }
};

