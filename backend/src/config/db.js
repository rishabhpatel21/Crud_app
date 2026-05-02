const mongoose = require('mongoose')

async function connectToDatabase(mongoUri) {
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  })
}

module.exports = {
  mongoose,
  connectToDatabase,
}

