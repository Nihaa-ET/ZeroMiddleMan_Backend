const SellerModel = require('../../models/sellerModels/AllsellerModel'); // Adjust the path as needed

// Fetch all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await SellerModel.getAllSellers();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sellers', error });
  }
};

// Fetch a seller by ID
exports.getSellerById = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await SellerModel.getSellerById(id);
    if (seller) {
      res.json(seller);
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (error) {
    console.error('Error fetching seller by ID:', error); // Debugging line
    res.status(500).json({ message: 'Error fetching seller', error });
  }
};

// Update a seller by ID
exports.updateSeller = async (req, res) => {
  try {
      const result = await SellerModel.updateSeller(req.params.id, req.body);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Seller not found' });
      }
      res.json({ message: 'Seller updated successfully!' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Disable and delete a seller by ID
exports.disableAndDeleteSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SellerModel.disableAndDeleteSeller(id);
    if (result) {
      res.json({ message: 'Seller disabled and deleted successfully' });
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error disabling and deleting seller', error });
  }
};

// Fetch all disabled sellers
exports.getAllDisabledSellers = async (req, res) => {
  try {
    const disabledSellers = await SellerModel.getAllDisabledSellers();
    res.json(disabledSellers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching disabled sellers', error });
  }
};

// Uncomment if needed
// Delete a disabled seller by ID
// exports.deleteDisabledSeller = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleted = await SellerModel.deleteDisabledSeller(id);
//     if (deleted) {
//       res.json({ message: 'Disabled seller deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Disabled seller not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting disabled seller', error });
//   }
// };
