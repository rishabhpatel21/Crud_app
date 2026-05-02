import { useEffect, useMemo, useState } from 'react'
import type { ProjectItem, ProjectStatus } from '../types/project'

export type ProjectFormValues = {
  title: string
  description: string
  status: ProjectStatus | ''
  techStack: string[]
}

export const defaultProjectFormValues: ProjectFormValues = {
  title: '',
  description: '',
  status: '',
  techStack: [],
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export function useProjectManager() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === editingId) ?? null,
    [editingId, projects],
  )

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setErrorMessage('')

        const response = await fetch(`${API_BASE_URL}/projects`)

        if (!response.ok) {
          throw new Error('Failed to load projects.')
        }

        const data = (await response.json()) as ProjectItem[]
        setProjects(data)
      } catch (error) {
        console.error(error)
        setErrorMessage('Unable to load projects. Check that the backend and MongoDB are running.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadProjects()
  }, [])

  const resetForm = () => {
    setEditingId(null)
  }

  const startEditing = (project: ProjectItem) => {
    setEditingId(project.id)
  }

  const deleteProject = async (projectId: string) => {
    try {
      setErrorMessage('')

      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete project.')
      }

      setProjects((current) => current.filter((project) => project.id !== projectId))

      if (editingId === projectId) {
        resetForm()
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to delete the project right now.')
    }
  }

  const initialValues = useMemo(() => {
    if (!selectedProject) {
      return defaultProjectFormValues
    }

    return {
      title: selectedProject.title,
      description: selectedProject.description,
      status: selectedProject.status,
      techStack: Array.isArray(selectedProject.techStack) ? selectedProject.techStack : [],
    } satisfies ProjectFormValues
  }, [selectedProject])

  const saveProject = async (values: ProjectFormValues) => {
    const title = values.title.trim()
    const description = values.description.trim()

    try {
      setErrorMessage('')

      if (editingId != null && selectedProject) {
        const response = await fetch(`${API_BASE_URL}/projects/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            status: values.status,
            techStack: values.techStack,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to update project.')
        }

        const updatedProject = (await response.json()) as ProjectItem

        setProjects((current) =>
          current.map((project) => (project.id === editingId ? updatedProject : project)),
        )
      } else {
        const response = await fetch(`${API_BASE_URL}/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            status: values.status,
            techStack: values.techStack,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create project.')
        }

        const newProject = (await response.json()) as ProjectItem
        setProjects((current) => [newProject, ...current])
      }

      resetForm()
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to save the project right now.')
      throw error
    }
  }

  return {
    projects,
    editingId,
    isLoading,
    errorMessage,
    isEditing: editingId != null,
    initialValues,
    saveProject,
    startEditing,
    deleteProject,
    resetForm,
  }
}
