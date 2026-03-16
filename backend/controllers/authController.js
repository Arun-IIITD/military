const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Base = require("../models/Base");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {

  try {

    const { name, email, password, role, base } = req.body;
    //console.log("reg",password)

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let baseId = null;
    if (role === "BASE_COMMANDER") {

      if (!base) {
        return res.status(400).json({ message: "Base is required for BASE_COMMANDER" });
      }

      const baseDoc = await Base.findOne({ name: base });

      if (!baseDoc) {
        return res.status(400).json({ message: "Invalid base selected" });
      }

      baseId = baseDoc._id;
    }

  
    // const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new User({
      name,
      email,
      password,
      role,
      base: baseId
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    //console.log("in reg controller", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;
    //console.log("login",password)

    const user = await User.findOne({ email }).populate("base");

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    //console.log("Entered password:", password);
    //console.log("Stored hash:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
        base: user.base
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        role: user.role,
        base: user.base ? user.base.name : null
      }
    });

  } catch (error) {
    console.log("in login control", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};