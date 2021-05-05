const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

module.exports = app