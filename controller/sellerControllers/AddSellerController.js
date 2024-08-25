const AddSellerModel = require('../../models/sellerModels/AddSellerModel');

exports.createSeller = async (req, res) => {
    try {
        // Ensure all required fields are present
        const requiredFields = [
            'companyName', 'contactPersonName', 'companyShortDescription', 'email', 
            'phoneNumber', 'companyAddressStreet', 'companyAddressLocality', 
            'companyAddressCity', 'companyAddressPIN', 'companyAddressState', 
            'companyAddressCountry', 'yearOfIncorporation', 'totalNoOfEmployees', 
            'majorBusinessType'
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ 
                    message: `Field ${field} is required`
                });
            }
        }

        // Pass the request body to the model to create a seller
        const result = await AddSellerModel.createSeller(req.body);
        res.status(201).json({
            message: 'Seller added successfully',
            sellerId: result.insertId
        });
    } catch (error) {
        console.error('Error adding seller:', error);
        res.status(500).json({
            message: 'Error adding seller',
            error: error.message
        });
    }
};

exports.getSellers = async (req, res) => {
    try {
        const sellers = await AddSellerModel.getAllSellers();
        res.status(200).json({ success: true, data: sellers });
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching sellers',
            error: error.message
        });
    }
};

// You can add more controller functions as needed
