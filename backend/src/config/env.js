const dotenv = require('dotenv')

dotenv.config()

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} in backend/.env`)
  }
  return value
}

module.exports = {
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: requiredEnv('MONGODB_URI'),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
}

