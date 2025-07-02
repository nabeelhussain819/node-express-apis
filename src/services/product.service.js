const products = require("../models/products.model");

exports.getProducts = async () => {
  return await products.find();
};
exports.getProductsById = async (productId) => {
  const productsData = await products.findById(productId);
  if (!productsData) return [];
  return productsData;
};
exports.getUserProducts = async (userId) => {
  const productsData = await products.find({ createdBy: userId });
  if (!productsData) return [];
  return productsData;
};
exports.createProduct = async (req) => {
  const { userId } = req.user;
  const imagePaths = req.files.map((file) => file.path);

  if (!imagePaths) {
    return res.status(400).json({ error: "Image is required" });
  }
  const newPayload = {
    ...req.body,
    image: imagePaths,
    createdBy: userId,
  };
  const product = new products(newPayload);
  return await product.save();
};
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const imagePaths = req.files.map((file) => file.path);
  if (!imagePaths) {
    return res.status(400).json({ error: "Image is required" });
  }
  const newPayload = {
    ...req.body,
    image: imagePaths,
  };
  const newProduct = await products.findByIdAndUpdate(productId, newPayload, {
    new: true,
  });
  console.log(newPayload);
  return newProduct;
};
exports.boostedProduct = async (productId) => {
    const productBoostDetail = await products.findById(productId);
  return await products.findByIdAndUpdate(productId, { boosted: !productBoostDetail.boosted }, {
    new: true,
  });
};


exports.deleteProduct = async (productId) => {
  return await products.findByIdAndDelete(productId);
};