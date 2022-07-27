const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)
  // blog
  //   .save()
  //   .then((response) => {
  //     res.status(201).json(response)
  //   })
  //   .catch((error) => {
  //     // console.log('In error', error)
  //     return next(error)
  //   })
  try {
    const newBlog = await blog.save()
    res.status(201).json(newBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
