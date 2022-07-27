const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('Blog list GET tests', () => {
  test('get all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('check blog id field is id and not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogToInspect = response.body[0]
    expect(blogToInspect.id).toBeDefined()
    expect(blogToInspect._id).not.toBeDefined()
  })
})

describe('Blog list POST tests', () => {
  test('Post blog to MongoDB', async () => {
    const blogToSave = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }
    const response = await api
      .post('/api/blogs/')
      .send(blogToSave)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const getResponse = await api.get('/api/blogs')
    const blogsInDb = getResponse.body
    expect(blogsInDb.length).toBe(initialBlogs.length + 1)

    const savedBlog = {
      title: response.body.title,
      author: response.body.author,
      url: response.body.url,
      likes: response.body.likes,
    }
    expect(savedBlog).toEqual(blogToSave)
  })
})

afterAll(() => {
  return mongoose.connection.close()
})
