const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const Post = require('./models/post')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://engrbrain:Fetele0301776@maincluster.1xeov.mongodb.net/postmanager?retryWrites=true&w=majority")
.then(() => {
  console.log('Connection to database!')
})
.catch(() => {
  console.log('Connection Failed')
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Acess-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save();
  res.status(201).json({
    message: 'Post added Successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
});

// app.use((req, res, next) => {
//   res.send('Hello from express');
// });

module.exports = app;
