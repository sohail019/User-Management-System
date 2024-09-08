import jwt from "jsonwebtoken";

//? Handle JWT token verification and user authentication:
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received in middleware:", token);
  console.log("Received Authorization Header:", req.headers.authorization);

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.log("Invalid token:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};


export default authMiddleware