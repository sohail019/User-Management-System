import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js";

dotenv.config()

const app = express()

//? Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
  })
);
app.use(express.json())

//? MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(`Error connecting to MongoDB: ${error}`));

  
//? Use Routes
app.use("/api/auth", authRoutes); 

//? Routes
app.get('/', (req,res) => {
    res.send("API is running...")
})


//? Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))