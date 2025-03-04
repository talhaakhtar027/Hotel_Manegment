const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authMiddleware = (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token
      if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
      }
  
      // Verify JWT token here and extract user information
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT:", decoded); // Log the decoded JWT to check the structure
      req.user = decoded; // Attach user info to the request
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Authentication failed" });
    }
  };
  

module.exports = authMiddleware;
