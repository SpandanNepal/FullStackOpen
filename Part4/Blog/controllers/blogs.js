const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require("jsonwebtoken")


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const content = request.body

    const token = getTokenfromRequest(request)

	const decodedToken = jwt.verify(token,process.env.SECRET)

	if(!token || !decodedToken.id){
		return response.status(401).json({ error : "token missing or invalid" })
	}

	const user = await User.findById(decodedToken.id)

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

blogRouter.delete("/blogs/:id", async(request,response) => {
	const token = request.token

	const decodedToken = jwt.verify(token,process.env.SECRET)
	
    if(!token || !decodedToken){
		return response.status(401).json({
			error: "token is missing"
		})
	}

	const id = request.params.id
	await Blog.findByIdAndDelete(id)
	response.status(204).end()
	const blog = await Blog.findById(id)
	
    if(blog.user.toString() === decodedToken.id){
		await Blog.findByIdAndDelete(id)
		response.status(204).end()
	}
	else{
		return response.status(401).json({
			error: "Unauthorized"
		})
	}
})

module.exports = blogRouter