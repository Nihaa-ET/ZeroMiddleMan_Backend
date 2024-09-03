const Seller = require('../../models/sellerModels/AddSellerModel');
const Product = require('../../models/sellerModels/AddProductModel');

        const createSellerWithProduct = {
            async createSeller(req, res) {
                const sellerData = {
                    company_name: req.body.company_name,
                    contact_person_name: req.body.contact_person_name,
                    company_short_description: req.body.company_short_description,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    alternative_number: req.body.alternative_number,
                    street: req.body.street,
                    locality: req.body.locality,
                    city: req.body.city,
                    pin: req.body.pin,
                    state: req.body.state,
                    country: req.body.country,
                    gst_vat_tax_number: req.body.gst_vat_tax_number,
                    year_of_incorporation: req.body.year_of_incorporation,
                    total_employees: req.body.total_employees,
                    business_website_url: req.body.business_website_url,
                    major_business_type: req.body.major_business_type
                };

                try {
                    // Insert seller and get the inserted ID
                    const [results] = await Seller.create(sellerData);
                    const insertedId = results.insertId;
                    console.log("Inserted Seller ID:", insertedId);

                    const products = req.body.products.map((product) => ({
                        ...product,
                        seller_id: insertedId   
                    }));

                    if (products.length === 0) {
                        return res.status(201).json({ message: 'Seller created successfully, but no products were provided.' });
                    }

                    // Insert all products
                    await Promise.all(products.map((product) => Product.create(product)));

                    // If successful
                    res.status(201).json({ message: 'Seller and products created successfully.' });
                } catch (error) {
                    // If an error occurs
                    res.status(500).json({ error: error.message });
                }
            }
        };

module.exports = createSellerWithProduct;
