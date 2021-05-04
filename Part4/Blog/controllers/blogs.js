const blogRouter = require('express').Router()
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
        response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
    const content = request.body
    if (!content.title){
        response.status(400).json({
            'error': 'content is missing'
        })
    }
    else{
        const blog = new Blog({
            title: content.title,
            author: content.author,
            url: content.url,
            likes: content.likes
        })
        blog
            .save()
            .then(result => {
            response.json(result)
        })
    }
})

module.exports = blogRouter