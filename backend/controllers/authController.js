const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Base = require("../models/Base")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {

  try {

    const { name, email, password, role, base } = req.body;

    // find base document
    const baseDoc = await Base.findOne({ name: base });

    if (!baseDoc) {
    return res.status(400).json({ message: "Invalid base selected" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = new User({
      name,
      email,
      password,
      role,
      base: baseDoc._id
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.log("in reg controller",error)
    res.status(500).json({
      message: "Serveeer error"
    });
  }
};


exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // if (user.password !== password) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }

     const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        base: user.base
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log("in login control",error)
    res.status(500).json({ message: "Serverr error" });
  }
};


exports.logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};