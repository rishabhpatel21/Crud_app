export type ProjectStatus = 'pending' | 'in-progress' | 'complete'

export type ProjectItem = {
  id: string
  title: string
  description: string
  status: ProjectStatus
}
