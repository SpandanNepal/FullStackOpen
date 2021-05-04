const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0)
		return 0
    else   
        return blogs.reduce((sum,blog) => sum += blog.likes,0)
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 0)
		return {}
    else
        return blogs.reduce((last_blog, max_blog) => max_blog.likes > last_blog.likes ? max_blog : last_blog)
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}