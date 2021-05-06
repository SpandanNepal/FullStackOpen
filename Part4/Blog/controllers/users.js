const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const validator = (content) => {
    const password = content.passwordHash
    const username = content.username

    if (password === undefined || username === undefined){
        return 'username or password is missing' 
    }
    else if (password.length < 3 || username.length < 3){
        return 'password or username too small'
    }
    return undefined
}

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate("blogs")

    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const content = request.body
    
    if (validator(content)){
        return response.status(400).json({error: validator(content)})
    }

    const saltRounds = 10

    const user = new User({
        username: content.username,
        name: content.name,
        passwordHash: await bcrypt.hash(content.passwordHash, saltRounds)
    })
    user
        .save()
        .then(result => {
        response.json(result)
    })
})

module.exports = userRouter