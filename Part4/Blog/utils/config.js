require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  testEnvironment: 'node',
  MONGODB_URI,
  PORT
}