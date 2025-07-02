const userService = require('../services/user.service');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  const {userId} = req.params;
  try {
    const user = await userService.updateUser(userId, req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

