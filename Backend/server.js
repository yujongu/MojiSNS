const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors");
const userRoutes = require("./db/routes/userRouter");
require("dotenv").config({ path: "./config.env" });

const Db = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

mongoose
  .connect(Db, { useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => {
    app.use(express.json());
    app.use(cors({
      origin: '*'
    }))

    app.use("/api", userRoutes)

    app.listen(port, () => {
      console.log("Backend server has started!")
    })
  })

