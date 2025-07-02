const User = require("../models/user.model");
exports.getAllUsers = async () => {
  return await User.find();
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};
exports.updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      name: userData.name,
      email: userData.email,
    },
    { new: true, runValidators: true }
  );
};
