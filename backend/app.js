const express = require('express');

const app = express();

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
