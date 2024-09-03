const SellerModel = require('../../models/sellerModels/AllsellerModel'); // Adjust the path as needed
const ProductModel = require('../../models/sellerModels/AllproductModel'); // Adjust the path as needed

// Seller-related functions
// Fetch all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await SellerModel.getAllSellers();
    res.json(sellers);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ message: 'Error fetching sellers', error: error.message });
  }
};

// Fetch a seller by ID
exports.getSellerById = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await SellerModel.getSellerById(id);
    if (seller.length > 0) {
      res.json(seller[0]);
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (error) {
    console.error('Error fetching seller by ID:', error);
    res.status(500).json({ message: 'Error fetching seller', error: error.message });
  }
};

// Update a seller by ID
exports.updateSeller = async (req, res) => {
  const { id } = req.params;
  const sellerData = req.body;
  try {
    const result = await SellerModel.updateSeller(id, sellerData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json({ message: 'Seller updated successfully!' });
  } catch (error) {
    console.error('Error updating seller:', error);
    res.status(500).json({ message: 'Error updating seller', error: error.message });
  }
};

// Disable a seller by ID
exports.disableSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SellerModel.disableSeller(id);
    res.json({ message: result.message });
  } catch (error) {
    console.error('Error disabling seller:', error);
    res.status(500).json({ message: 'Error disabling seller', error: error.message });
  }
};

// Fetch all disabled sellers
// Controller: ProductSellerController.js

exports.getAllDeletedProductSellers = async (req, res) => {
  try {
    const deletedProductSellers = await SellerModel.getAllDeletedProductSellers();
    res.json(deletedProductSellers);
  } catch (error) {
    console.error('Error fetching deleted product-seller data:', error);
    res.status(500).json({ message: 'Error fetching deleted product-seller data', error: error.message });
  }
};
exports.restoredDeletedSellersAndProducts = async (req, res) => {
  try {
    const { ids } = req.body; // Extract the array of IDs from the request body
    
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided' });
    }

    const result = await SellerModel.updateDeletedFieldForSellersAndProducts(ids);
    
    if (result.affectedRows > 0) {
      res.json({ message: 'Deleted fields updated successfully!', affectedRows: result.affectedRows });
    } else {
      res.status(404).json({ message: 'No matching records found or already updated' });
    }
  } catch (error) {
    console.error('Error updating deleted fields:', error);
    res.status(500).json({ message: 'Error updating deleted fields', error: error.message });
  }
};
exports.deleteSellersAndProducts = async (req, res) => {
  try {
    const { ids } = req.body; // Extract the array of IDs from the request body
    
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided' });
    }

    const result = await SellerModel.deleteSellersAndProductsByIds(ids);
    
    if (result.affectedRows > 0) {
      res.json({ message: 'Rows deleted successfully!', affectedRows: result.affectedRows });
    } else {
      res.status(404).json({ message: 'No matching records found to delete' });
    }
  } catch (error) {
    console.error('Error deleting rows:', error);
    res.status(500).json({ message: 'Error deleting rows', error: error.message });
  }
};
// UserController.js
exports.deleteSellers = async (req, res) => {
  try {
    const { ids } = req.body; // Extract the array of IDs from the request body
    
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided' });
    }

    const result = await UserModel.deleteSellersByIds(ids);
    
    if (result.affectedRows > 0) {
      res.json({ message: 'Users deleted successfully!', affectedRows: result.affectedRows });
    } else {
      res.status(404).json({ message: 'No matching users found to delete' });
    }
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Error deleting users', error: error.message });
  }
};





// Product-related functions
// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Fetch a product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.getProductById(id);
    if (product.length > 0) {
      res.json(product[0]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const result = await ProductModel.updateProduct(id, productData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully!' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Disable a product by ID
exports.disableProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ProductModel.disableProduct(id);
    res.json({ message: result.message });
  } catch (error) {
    console.error('Error disabling product:', error);
    res.status(500).json({ message: 'Error disabling product', error: error.message });
  }
};
// Fetch all deleted sellers
// Fetch all deleted products



