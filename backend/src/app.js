const express = require('express')
const cors = require('cors')

const healthRoutes = require('./routes/healthRoutes')
const projectRoutes = require('./routes/projectRoutes')
const errorHandler = require('./middleware/errorHandler')

function createApp({ clientUrl }) {
  const app = express()

  app.use(
    cors({
      origin: clientUrl,
    }),
  )
  app.use(express.json())

  app.use('/api', healthRoutes)
  app.use('/api', projectRoutes)

  app.use(errorHandler)

  return app
}

module.exports = createApp

