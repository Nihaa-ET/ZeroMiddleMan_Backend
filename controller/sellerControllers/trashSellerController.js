const SellerModel = require('../../models/sellerModels/trashSellerModel'); // Adjust path as needed

exports.getTrashedSellers = async (req, res) => {
  try {
    const sellers = await SellerModel.getTrashedSellers();
    res.status(200).json({ success: true, data: sellers });
  } catch (error) {
    console.error('Error fetching trashed sellers:', error);
    res.status(500).json({ success: false, message: 'Error fetching trashed sellers.' });
  }
};

exports.restoreSeller = async (req, res) => {
  try {
    const restored = await SellerModel.restoreSeller(req.params.id);
    if (restored) {
      res.status(200).json({
        success: true,
        message: 'Seller restored successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }
  } catch (error) {
    console.error('Error restoring seller:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while restoring the seller.'
    });
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const deleted = await SellerModel.deleteSeller(req.params.id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Seller permanently deleted.'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }
  } catch (error) {
    console.error('Error deleting seller:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the seller.'
    });
  }
};
