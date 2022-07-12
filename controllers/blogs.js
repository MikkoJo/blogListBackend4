const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  console.log('GET')
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.post('/', (req, res) => {
  console.log('POST')
  const blog = new Blog(req.body)

  blog.save().then((newBlog) => {
    res.status(201).json(newBlog)
  })
})

module.exports = blogsRouter
