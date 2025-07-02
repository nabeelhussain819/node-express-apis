const { validationResult } = require("express-validator");
const productService = require("../services/product.service");
exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};
exports.getProductsById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProductsById(productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
};
exports.getUserProducts = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const product = await productService.getUserProducts(userId);
    if (product.length <= 0)
      return res.json(
        res.status(200).json({
          message: "No Products found",
        })
      );
    res.json(product);
  } catch (err) {
    next(err);
  }
};
exports.createProduct = async (req, res, next) => {
     const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = await productService.createProduct(req);
    if (!product)
      return res.status(200).json({
          message: "No Products found",
        })
     return res.status(200).json({
          message: "Products Created Successfully",
        })
  } catch (err) {
    next(err);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req, res);
    if (!product)
      return res.status(200).json({
          message: "No Products found",
        })
     return  res.status(200).json({
          message: "Products Updated Successfully",
        })
  } catch (err) {
    next(err);
  }
};
exports.boostedProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productService.boostedProduct(productId);
    if (!product)
      return res.status(200).json({
          message: "No Products found",
        })
     return  res.status(200).json({
          message: "Products Boost Update Successfully",
        })
  } catch (err) {
    next(err);
  }
};


exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productService.deleteProduct(productId);
    if (!product)
      return res.status(200).json({
          message: "No Products found",
        })
     return  res.status(200).json({
          message: "Products Deleted Successfully",
        })
  } catch (err) {
    next(err);
  }
};