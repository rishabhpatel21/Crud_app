const Project = require('../models/Project')

async function listProjects(_request, response, next) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    response.json(projects)
  } catch (error) {
    next(error)
  }
}

async function createProject(request, response, next) {
  try {
    const { title, description, status } = request.body

    const project = await Project.create({
      title,
      description,
      status,
    })

    response.status(201).json(project)
  } catch (error) {
    next(error)
  }
}

async function updateProject(request, response, next) {
  try {
    const { id } = request.params
    const { title, description, status } = request.body

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true, runValidators: true },
    )

    if (!updatedProject) {
      return response.status(404).json({ message: 'Project not found' })
    }

    response.json(updatedProject)
  } catch (error) {
    next(error)
  }
}

async function deleteProject(request, response, next) {
  try {
    const { id } = request.params

    const deletedProject = await Project.findByIdAndDelete(id)

    if (!deletedProject) {
      return response.status(404).json({ message: 'Project not found' })
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
}

