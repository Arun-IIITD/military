const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Use the exact field from your token
    //console.log("user_id", decoded.id);

    req.user = {
      id: decoded.id,    // ✅ matches your JWT payload
      role: decoded.role,
      base: decoded.base // optional if you want it available
    };

    //console.log("req.user", req.user);

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;