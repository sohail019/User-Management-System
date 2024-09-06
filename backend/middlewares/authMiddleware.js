import jwt from "jsonwebtoken";

//? Handle JWT token verification and user authentication:
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received in middleware:", token);

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};


export default authMiddleware