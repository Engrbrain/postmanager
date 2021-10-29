const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Acess-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});
app.post("/api/posts", (req, res, next) => {
  const post = req.body; // This will return one post
  console.log(post);
  res.status(201).json({
    message: 'Post added Successfully'
  });
});
app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id:'jskjsj987', title: 'First Server-Side Post', content: 'This is coming from the server'},
    {id:'ishsghj34', title: 'Second Server-Side Post', content: 'This is coming from the server'},
    {id:'kjashysk2', title: 'Third Server-Side Post', content: 'This is coming from the server'}
  ]
res.status(200).json({
  message: 'Posts fetched successfully',
  posts: posts
});
});

// app.use((req, res, next) => {
//   res.send('Hello from express');
// });

module.exports = app;
