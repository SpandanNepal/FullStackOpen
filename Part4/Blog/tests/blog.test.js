const app = require("../app")
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const { get } = require("../controllers/blogs")

test('blogs are retured as json', async () => {  // 4.8
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
test('unique identifier is id', async () => {  // 4.9
  const response = await api
  .get('/api/blogs')

  expect(response.body.id).toBeDefined()
})
  
test('a valid blog can be added', async () => { // 4.10
  const newBlog = {
    title: "Post 4",
    author: "Swami D",
    url: "http://localhost/api/blog/4",
    likes: 4
}
  let response = await api.get('/api/blogs')

  const intial_blog_length = response.body.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  response = await api.get('/api/blogs')
  
  const contents = response.body.map(content => content.title)
  
  expect(response.body).toHaveLength(intial_blog_length + 1)
  expect(contents).toContain(
    'Post 4'
  )
})

test('like is missing then set to zero', async () => {
    const newBlog = {
        title: "Post 5",
        author: "Uniq Poet",
        url: "http://localhost/api/blog/5"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.likes).toBe(0)
})

test("/api/blogs requires title and url in the body", async () => {
	const newBlog = {
        author: "Uniq Poet",
        likes: 10
    }
	const response = await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(400)
        .expect('Content-Type', /application\/json/)

	expect(response.body.error).toBe("content is missing")
})

afterAll(() => {
    mongoose.connection.close()
 })