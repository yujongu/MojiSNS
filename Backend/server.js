const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./db/routes/userRouter");
const postRoutes = require("./db/routes/postRouter");
const topicRoutes = require("./db/routes/topicRouter");
const commentRoutes = require("./db/routes/commentRouter");

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

    

    app.listen(port, () => {
      console.log("Backend server has started!")
    })

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())


    app.use("/api/post", postRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/topic", topicRoutes);
    app.use("/api/comment", commentRoutes);
  })

