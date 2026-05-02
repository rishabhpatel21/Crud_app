const express = require('express')

const router = express.Router()

router.get('/health', (_request, response) => {
  response.json({ ok: true })
})

module.exports = router

