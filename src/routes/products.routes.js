const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { upload } = require('../../utils/imageUploader');
const { productValidation } = require('../validations/productValidations');


router.get('/', productController.getProducts);
router.get('/my-products',  productController.getUserProducts);
router.get('/:productId',  productController.getProductsById);
router.post('/', [upload.array('image', 5),productValidation],  productController.createProduct);
router.put('/:productId', upload.array('image', 5),  productController.updateProduct);
router.put('/boost/:productId',  productController.boostedProduct);
router.delete('/:productId',  productController.deleteProduct);

module.exports = router;

