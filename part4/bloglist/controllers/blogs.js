const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing' })
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
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    await blog.delete()
    response.status(204).end()
  }
  response.status(400).end()
})

router.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    await blog.delete()
    response.status(204).end()
  }
  response.status(400).end()
})

router.put('/', async (request, response) => {
  const newBlog = new Blog(request.body)
  if (newBlog.likes === undefined) {
    newBlog.likes = 0
  }

  if (newBlog._id && newBlog.title && newBlog.url) {
    const updatedBlog = await Blog.findByIdAndUpdate(newBlog._id, newBlog, { new: true })

    response
      .status(201)
      .json(updatedBlog)
  }
  response.status(400).send()
})

module.exports = router
