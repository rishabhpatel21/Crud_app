import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { ProjectItem, ProjectStatus } from '../types/project'

type ProjectFormState = {
  title: string
  description: string
  status: ProjectStatus | ''
  techStack: string[]
}

const defaultFormState: ProjectFormState = {
  title: '',
  description: '',
  status: '',
  techStack: [],
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export function useProjectManager() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [formState, setFormState] = useState<ProjectFormState>(defaultFormState)
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
    setFormState(defaultFormState)
    setEditingId(null)
  }

  const updateField = <K extends keyof ProjectFormState>(field: K, value: ProjectFormState[K]) => {
    setFormState((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = formState.title.trim()
    const description = formState.description.trim()

    if (!title || !description || !formState.status) {
      return
    }

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
            status: formState.status,
            techStack: formState.techStack,
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
            status: formState.status,
            techStack: formState.techStack,
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
    }
  }

  const startEditing = (project: ProjectItem) => {
    setFormState({
      title: project.title,
      description: project.description,
      status: project.status,
      techStack: Array.isArray(project.techStack) ? project.techStack : [],
    })
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

  return {
    projects,
    formState,
    editingId,
    isLoading,
    errorMessage,
    isEditing: editingId != null,
    handleSubmit,
    updateField,
    startEditing,
    deleteProject,
    resetForm,
  }
}
