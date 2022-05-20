import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/user.js"
import chatRoutes from "./routes/chat.js"
import orderRoutes from "./routes/orders.js"

import path from "path"

dotenv.config()

const app = express()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(
  cors({
    exposedHeaders: [
      "X-Pagination-Count",
      "X-Pagination-Total",
      "X-Pagination-Page",
    ],
  }))

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set("useFindAndModify", false)

/* app.get('/', (req, res) => {
  res.send('Welcome to Iber API')
}) */

app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/orders", orderRoutes)

// Production

app.use(express.static("client/build"))
app.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"))
})
