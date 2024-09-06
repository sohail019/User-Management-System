import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

//? Register a new user

router.post("/register", async (req, res) => {
    console.log("Register route hit");
  const { username, email, password, role } = req.body;

  try {
    const user = await User.create({ username, email, password, role });
    console.log(user);
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ? Login user and return a jwt token
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "30d" }
//     );
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not defined");
//     }
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ? Protected routes for user profile
router.get('/profile', authMiddleware, async (req, res) => {
  console.log("User from token:", req.user);
    try {
        const user = await User.findById({_id: req.user.id})
        if(!user){
          return res.status(404).json({error: "User not found"})
        }
        res.json(user)  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//? Admin route to get all users
router.get('/users', authMiddleware, roleMiddleware("Admin"), async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// ? Admin route to update user by id
router.put('/users/:id', authMiddleware, roleMiddleware("Admin"), async (req, res) => {
  const {role} = req.body

  try{
    const user = await User.findByIdAndUpdate(req.params.id, {role}, {new: true})

    if(!user){
      return res.status(404).json({error: "User not found"})
    }
    res.json(user)
  } catch(error) {
    res.status(500).json({error: error.message})
  }
})

//? Admin route to delete a user by id
router.get('/users/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        res.json({message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router