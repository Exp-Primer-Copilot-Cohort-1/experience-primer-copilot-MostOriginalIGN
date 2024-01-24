// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
// Create app
const app = express();
// Set app to use json
app.use(bodyParser.json());
// Set app to use cors
app.use(cors());

// Create object to store comments
const commentsByPostId = {};

// Create endpoint to get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create endpoint to create a new comment
app.post('/posts/:id/comments', (req, res) => {
  // Create a random id
  const commentId = randomBytes(4).toString('hex');
  // Get the content from the request body
  const { content } = req.body;
  // Get the comments for the post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the comments array
  comments.push({ id: commentId, content });
  // Set the comments for the post id
  commentsByPostId[req.params.id] = comments;
  // Send the new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});