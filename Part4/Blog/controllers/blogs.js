const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const content = request.body

    const user = await User.findById(content.userId)

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
            likes: content.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    }
})

module.exports = blogRouter