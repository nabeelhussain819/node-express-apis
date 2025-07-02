const { body } = require("express-validator");

exports.productValidation = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("category").notEmpty().withMessage("Category is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("image").custom((value, { req }) => {
    console.log(req.files);
    if (!req.files.length > 0) {
      throw new Error("No file uploaded");
    }
    const allFiles = req.files;
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    allFiles.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
      }
      if (!validTypes.includes(file.mimetype)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, or GIF files are allowed"
        );
      }
    });
    return true;
  }),
];
