const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res, next) => {
  try {
    const responseData = await authService.signUp(req, res, next);
    res.status(201).json({
      message: "Signed Up successfully",
      token: responseData.token,
      user: responseData.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({
        message: "Already logged in",
        token,
        userId: decodedToken.userId,
      });
  }
  try {
    const responseData = await authService.signin(req, res, next);
    res.status(201).json({
      message: "Signed in successfully",
      token: responseData.token,
      user: responseData.user,
    });
  } catch (err) {
    next(err);
  }
};
