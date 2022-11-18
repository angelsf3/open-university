const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', async (request, response) => {
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

  const users = await User.find({}).exec()

  if (!(users.length > 0)) {
    return response
      .status(400)
      .json({ error: 'No users in the DB' })
      .send()
  }

  const user = users.at(randomNumber(0, users.length - 1))
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
