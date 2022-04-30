const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./util/test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

jest.setTimeout(15000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promises = blogObjects
    .map(blog => blog.save())
  await Promise.all(promises)
})

test('http get method test', async () => {
  const blogs = await helper.blogsInDb()
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(blogs.length)
})

test('response has id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('the first blog is about React', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(b => b.title)
  expect(titles).toContain('React patterns')
})

afterAll(() => {
  mongoose.connection.close()
})