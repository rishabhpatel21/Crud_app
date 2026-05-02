const Project = require('../models/Project')

function normalizeTechStack(value) {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : []

  const normalized = rawValues
    .filter((item) => typeof item === 'string')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)

  return Array.from(new Set(normalized))
}

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
    const { title, description, status, techStack } = request.body

    const project = await Project.create({
      title,
      description,
      status,
      techStack: normalizeTechStack(techStack),
    })

    response.status(201).json(project)
  } catch (error) {
    next(error)
  }
}

async function updateProject(request, response, next) {
  try {
    const { id } = request.params
    const { title, description, status, techStack } = request.body

    const update = { title, description, status }
    if (techStack !== undefined) {
      update.techStack = normalizeTechStack(techStack)
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      update,
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
