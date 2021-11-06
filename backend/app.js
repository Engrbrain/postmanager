const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

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

app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers",
//   "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Acess-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
//   if (res.Method == "OPTIONS" || res.Method == "DELETE") {
//     res.header("http.StatusOK")
//     return
//   }
//   next();
// });


app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added Successfully',
      postId: createdPost._id
    });
  });

});
app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
    Post.updateOne({_id: req.params.id}, post). then(result => {
      res.status(200).json({message: 'Update Successful!'});
    });
  });


app.get("/api/post/:id", (req, res, next) => {
Post.findById(req.params.id).then(post => {
  if (post) {
    res.status(200).json(post);
  }else {
    res.status(404).json({message: 'Post not Found!'});
  }
})
});




app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});



// app.use((req, res, next) => {
//   res.send('Hello from express');
// });

module.exports = app;
