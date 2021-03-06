const logger = require("./logger")

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization")
	if(authorization && authorization.toLowerCase().startsWith("bearer ")){
		request.token =  authorization.slice(7)
		return next()
	}
	request.token =  null
	return next()
}

const errorHandler = (error, request, response, next) => {
if (error.name === 'CastError') {
    return response.status(400).send({
    error: 'malformatted id'
    })
} 
else if (error.name === 'ValidationError') {
    return response.status(400).json({
    error: error.message 
    })
} 
else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
    error: 'invalid token'
    })
}

logger.error(error.message)

next(error)
}

module .exports = {tokenExtractor, errorHandler}