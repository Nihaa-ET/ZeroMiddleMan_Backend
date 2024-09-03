const express = require('express');
const router = express.Router(); // Initialize the router at the beginning
const multer = require('multer');
const { getSellerById } = require('../models/sellerModels/AllsellerModel');
const { downloadSellersAndProducts,getSellersAndProducts , uploadSellersAndProducts} = require('../controller/sellerControllers/ImportExportController');
const { register, login } = require('../controller/userControllers/userController');
const DisabledUserController = require('../controller/userControllers/DisabledUserController');

// const AllSellerController = require('../controller/sellerControllers/AllSellerController')
const createSellerWithProduct = require('../controller/sellerControllers/AddSellerController')
const ActiveAdminController = require('../controller/userControllers/ActiveAdminController')
const ActiveUserController = require('../controller/userControllers/ActiveUserController')
const TrashSellerController = require('../controller/sellerControllers/trashSellerController');
const verifyToken = require('../middleware/authMiddleware');
const UserUpdateController= require('../controller/userControllers/UpdateUserController')
const AllSellerController = require('../controller/sellerControllers/AllSellerController');



// Import/Export
router.get('/get_sellers', getSellersAndProducts);
router.get('/sellers/download', downloadSellersAndProducts);
router.post('/upload', uploadSellersAndProducts);

// Register & Login
router.post('/register', register);
router.post('/login', login);

// ActiveUser Routes
router.get('/users',ActiveUserController.getAllUsers);
router.post('/disable-user/:userId', ActiveUserController.disableUser);

// DisableUsers Routes
router.get('/disabled-users', DisabledUserController.getAllDisabledUsers);
router.post('/activate-user/:userId', DisabledUserController.activateUser);
router.delete('/delete-user/:userId', DisabledUserController.deleteUser);
router.patch('/update-user', UserUpdateController.updateUser);
// Trash seller routes
// router.delete('/disable-delete-seller/:id', AllSellerController.disableAndDeleteSeller);
router.get('/trashed-sellers', TrashSellerController.getTrashedSellers);
router.patch('/restore-seller/:id', TrashSellerController.restoreSeller);
router.delete('/delete-seller/:id', TrashSellerController.deleteSeller);
router.post('/delete-Sellers', AllSellerController.deleteSellers);

// Add Seller route


router.post('/add-seller',createSellerWithProduct.createSeller );
// All Seller route
// router.get('/sellers',AllSellerController.getAllSellers);
// Route to get all sellers

// router.get('/seller/:id', AllSellerController.getSellerById);
// router.patch('/update-seller/:id', AllSellerController.updateSeller);
// router.delete('/disable-seller/:id',AllSellerController .disableAndDeleteSeller);
// Existing routes...

router.get('/admins', ActiveAdminController.getActiveAdmins);
router.post('/disable-admin/:adminId', ActiveAdminController.disableAdmin);



// Seller routes
router.get('/sellers', AllSellerController.getAllSellers);
router.get('/sellers/:id', AllSellerController.getSellerById);
router.put('/update-sellers/:id', AllSellerController.updateSeller);
router.patch('/disable-sellers/:id', AllSellerController.disableSeller);
router.get('/deleted-product-sellers', AllSellerController.getAllDeletedProductSellers);
router.put('/restore-deleted-sellers-and-Products', AllSellerController.restoredDeletedSellersAndProducts);
router.delete('/permanent-delete-sellers', AllSellerController.deleteSellersAndProducts);


// Product routes
router.get('/products', AllSellerController.getAllProducts);
router.get('/products/:id', AllSellerController.getProductById); 
router.put('/update-products/:id', AllSellerController.updateProduct);
router.patch('/disable-products/:id', AllSellerController.disableProduct);

//product routes
// Protected routes
router.get(
  '/superadmin',
  verifyToken(process.env.SUPERADMIN_ROLES.split(',')),
  (req, res) => {
    res.status(200).json({ message: 'Success', role: req.user.role });
  }
);

router.get(
  '/admin',
  verifyToken(process.env.ADMIN_ROLES.split(',')),
  (req, res) => {
    res.status(200).json({ message: 'Success', role: req.user.role });
  }
);

router.get(
  '/tl',
  verifyToken(process.env.TL_ROLES.split(',')),
  (req, res) => {
    res.status(200).json({ message: 'Success', role: req.user.role });
  }
);

router.get(
  '/editor',
  verifyToken(process.env.EDITOR_ROLES.split(',')),
  (req, res) => {
    res.status(200).json({ message: 'Success', role: req.user.role });
  }
);

router.get(
  '/viewer',
  verifyToken(process.env.VIEWER_ROLES.split(',')),
  (req, res) => {
    res.status(200).json({ message: 'Success', role: req.user.role });
  }
);

module.exports = router;
