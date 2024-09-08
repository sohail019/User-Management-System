import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  console.log("Register route hit");
  const { username, email, password, role } = req.body;

  try {
    const user = await User.create({ username, email, password, role });
    console.log(user);

    // Generate JWT token after user is registered
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user and return a jwt token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec(); // Ensure to call exec()

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Verify the instance
    console.log("User object type:", user.constructor.name);

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Error in login route:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Protected route for user profile
router.get("/profile", authMiddleware, async (req, res) => {
  console.log("User from token:", req.user);

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin route to get all users
router.get("/users", authMiddleware, roleMiddleware("Admin"), async (req, res) => {
  try {
    console.log("Fetching users..."); // Debugging log
    const users = await User.find();
    console.log("Users found:", users); // Debugging log
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// Admin route to update user role by id
router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    const { role } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Admin route to delete a user by id
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
