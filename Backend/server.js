const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./db/routes/userRouter");
const postRoutes = require("./db/routes/postRouter");
const topicRoutes = require("./db/routes/topicRouter");
const commentRoutes = require("./db/routes/commentRouter");
const notificationRouter = require("./db/routes/notificationRouter");
const bp = require('body-parser')
require("dotenv").config({ path: "./config.env" });

const Db = process.env.ATLAS_URI;
const port = process.env.PORT;

const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


mongoose
  .connect(Db, { useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => {
    //app.use(express.json());
    app.use(bp.json())
    app.use(bp.urlencoded({ extended: true }))
    app.use(cors({
      origin: '*'
    }))

    app.listen(port, () => {
      console.log("Backend server has started!")
    })
    app.use(morgan('combined', { stream: accessLogStream }))
    app.use("/api/post", postRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/topic", topicRoutes);
    app.use("/api/comment", commentRoutes);
    app.use("/api/notification", notificationRouter);
  })

