const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./util/test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

jest.setTimeout(25000)

describe('Blog tester', () => {
  const login = async () => {
    const user = { username: 'root', password: 'admin' }

    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `Bearer ${response.body.token}`
    return token
  }

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promises = blogObjects
      .map(blog => blog.save())
    await Promise.all(promises)

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('admin', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
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

  test('http post method test', async () => {
    const token = await login()

    const newBlog = helper.initialBlogs[0]
    newBlog._id = await helper.nonExistingId()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('http post method error by authentication test', async () => {
    const newBlog = helper.initialBlogs[0]

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about React', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    expect(titles).toContain('React patterns')
  })

  test('blog has likes property', async () => {
    const token = await login()

    const newBlog = {
      title: 'Unpopular blog',
      author: 'Angel',
      url: 'https://test.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)

    const blogs = await helper.blogsInDb()
    const savedBlog = blogs.find(blog => blog.title === newBlog.title)
    expect(savedBlog.likes).toBeDefined()
    expect(savedBlog.likes).toBe(0)
  })

  test('blog has title property', async () => {
    const token = await login()

    const newBlog = {
      author: 'Angel',
      url: 'https://test.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog has url property', async () => {
    const token = await login()

    const newBlog = {
      title: 'Title',
      author: 'Angel',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('remove blog by id', async () => {
    const token = await login()

    const newBlog = helper.initialBlogs[0]
    newBlog._id = await helper.nonExistingId()

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToRemove = response.body

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('fail remove blog by id by authentication', async () => {
    const blogToRemove = helper.initialBlogs[0]
    await api
      .delete(`/api/blogs/${blogToRemove._id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('update blog', async () => {
    const token = await login()

    const newBlog = helper.initialBlogs[0]
    newBlog._id = await helper.nonExistingId()

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToUpdate = response.body
    blogToUpdate.likes = 5

    await api
      .put('/api/blogs')
      .send(blogToUpdate)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
  })

  test('update blog fail by authorization', async () => {
    const token = await login()

    const newBlog = helper.initialBlogs[0]
    newBlog._id = await helper.nonExistingId()

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToUpdate = response.body
    blogToUpdate.likes = 5

    await api
      .put('/api/blogs')
      .send(blogToUpdate)
      .expect(401)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
