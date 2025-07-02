const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
  const userData = req.body;
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {user: newUser, token};
  }
};

exports.signin = async (req, res) => {
  const {email, password} = req.body;
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(401).json({ message: "you need to signup first" });
     }
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
       return res.status(401).json({ message: "password is not valid" });
     }
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
       expiresIn: "1h",
     });
     return {user, token};
};