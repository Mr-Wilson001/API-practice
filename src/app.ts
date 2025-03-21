import express from "express"
import mongoose from "mongoose"

const app = express()


import dotenv from "dotenv"
import router from "./routes/note.route"
dotenv.config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/v1", router) 

mongoose.connect(process.env.MONGODB_URI!)
.then(() => {
  console.log("Connected to our MongoDB database")
})
.catch(() => {
    console.log("Failed to connect to our MongoDB database")      
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

