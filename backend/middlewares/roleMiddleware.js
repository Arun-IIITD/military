function authorize(roles) {

  return (req, res, next) => {
    try {

      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      if (roles.includes(req.user.role)) {
        return next();
      } 
      else {
        return res.status(403).json({
          message: "Accesss Denied"
        });
      }

    } catch (err) {
      console.error("Authorize Middleware Error:", err);

      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message
      });
    }
  };

}

module.exports = authorize;