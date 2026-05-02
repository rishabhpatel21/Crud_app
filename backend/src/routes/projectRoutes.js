const express = require('express')
const projectController = require('../controllers/projectController')

const router = express.Router()

router.get('/projects', projectController.listProjects)
router.post('/projects', projectController.createProject)
router.put('/projects/:id', projectController.updateProject)
router.delete('/projects/:id', projectController.deleteProject)

module.exports = router

