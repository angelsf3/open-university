const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const newBlog = new Blog(request.body)

  if (newBlog.likes === undefined) {
    newBlog.likes = 0
  }

  if (!(newBlog.title && newBlog.url)) {
    return response
      .status(400)
      .json({ error: 'Missing url or title' })
      .send()
  }

  if (!user) {
    return response
      .status(400)
      .json({ error: 'No user not found' })
      .send()
  }

  newBlog.user = user._id

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()

  response
    .status(201)
    .json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  const userId = decodedToken.id
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === userId.toString()) {
    await blog.delete()
    response.status(204).end()
  }
  response
    .status(400)
    .json({ error: 'Invalid user' })
})

router.put('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  const userId = decodedToken.id

  if (request.body.user.toString() === userId.toString()) {
    const newBlog = request.body
    if (newBlog.likes === undefined) {
      newBlog.likes = 0
    }

    if (newBlog.id && newBlog.title && newBlog.url) {
      const updatedBlog = await Blog.findByIdAndUpdate(newBlog.id, newBlog, { new: true })

      response
        .status(201)
        .json(updatedBlog)
    }
    response.status(400).send()
  }
  response
    .status(400)
    .json({ error: 'Invalid user' })
})

module.exports = router
