import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import notesRoutes from "./routes/note.route"
import connectDB from "./server"
import authRouter from "./routes/auth.route";




const app = express()
dotenv.config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRoutes);

const PORT = process.env.PORT || 5001

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

