const { mongoose } = require('../config/db')

function errorHandler(error, _request, response, _next) {
  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ message: error.message })
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ message: 'Invalid project id' })
  }

  console.error(error)
  return response.status(500).json({ message: 'Internal server error' })
}

module.exports = errorHandler

