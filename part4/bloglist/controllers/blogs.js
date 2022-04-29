const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)
  const savedBlog = await newBlog.save()
  response
    .status(201)
    .json(savedBlog)
})

module.exports = router