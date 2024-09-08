// ? Role based access control

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      console.log(
        "Role mismatch. User role:",
        req.user.role,
        "Required role:",
        requiredRole
      ); // Debugging log
      return res.status(403).json({ message: "Access denied" });
    }
    console.log("User has sufficient role:", req.user.role); // Debugging log
    next();
  };
};

export default roleMiddleware;