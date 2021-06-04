const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    
    {console.log(user._id, user.passwordHash)}
    // const passwordCorrect = user === null
    //     ? false
    //     : await bcrypt.compare(body.password, "12345")
    
    const passwordCorrect = true
    {console.log(passwordCorrect)}

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }
    {console.log(userForToken)}
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter