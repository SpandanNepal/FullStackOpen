import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title,setTitle] = useState("")
  const [url,setUrl] = useState("")
  const [author,setAuthor] = useState("")
  const [likes,setLikes] = useState(0)

  const [notify,setNotify] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogin =  async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogUser")
    setUser(null)
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    try{
      const response = await blogService.createBlog({title, author, url, likes })
      setBlogs(blogs.concat(response))
      setNotify({message: `a new blog ${response.title} by ${response.author}`, type: "success"})
      setTimeout(() => {
        setNotify(null)
      },5000)
      setTitle("")
      setLikes("")
      setAuthor("")
      setUrl("")
    }
    catch(exception){
      {console.log(exception.response)}
      setNotify({message: exception.response.error, type:"error"})
      setTimeout(() => {
        setNotify(null)
      },5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser")
    if(loggedBlogUser){
      const user = JSON.parse(loggedBlogUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const createBlog = () => {
    return (
      <div>
        <form onSubmit={handleCreateBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
          author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <div>
          likes:
          <input
            type="number"
            value={likes}
            name="likes"
            onChange={({target}) => setLikes(target.value)}
          />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p> <button onClick={handleLogout}>Logout</button>
        {createBlog()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    </div>
  )
}

export default App