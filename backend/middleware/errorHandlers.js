const jwt = require("jsonwebtoken");
require("dotenv").config();

export const errorHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No Token" });
  try {
    console.log(`Token received ${token}`);
    console.log(`JWT_SECRET_KEY : ${process.env.JWT_SECRET_KEY}`);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT Error:", err.message);
    res.status(403).json({ message: "Invalid Token" });
  }
};
