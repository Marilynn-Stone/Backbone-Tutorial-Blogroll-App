const express = require('express');

const mongodb = require('mongodb');
const mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/blogroll');
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  author: String,
  title: String,
  url: String
});
mongoose.model('Blog', BlogSchema);
const Blog = mongoose.model('Blog');
const blog = new Blog({
  author: "Marilynn",
  title: "My blod",
  url: "http://myblog.com"
});
blog.save ();

const app = express();
const morgan = require('morgan');

app.use(express.static(__dirname + '/public'));

const port = 3000;
app.listen(port);
console.log('server on ' + port);
