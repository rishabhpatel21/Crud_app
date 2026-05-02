const { PORT, MONGODB_URI, CLIENT_URL } = require('./config/env')
const { connectToDatabase } = require('./config/db')
const createApp = require('./app')

async function startServer() {
  await connectToDatabase(MONGODB_URI)
  console.log('Connected to MongoDB')

  const app = createApp({ clientUrl: CLIENT_URL })
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server')
  console.error(error)
  process.exit(1)
})

