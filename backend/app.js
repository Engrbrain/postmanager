const path = require("path")
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

mongoose.connect("mongodb+srv://engrbrain:Fetele0301776@maincluster.1xeov.mongodb.net/postmanager?retryWrites=true&w=majority")
.then(() => {
  console.log('Connection to database!')
})
.catch(() => {
  console.log('Connection Failed')
});

app.use(cors());

app.use("/api/posts", postsRoutes);
app.use("/api/user", postsRoutes);

module.exports = app;
