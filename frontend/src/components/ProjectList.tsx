import type { ProjectItem } from '../types/project'
import { ProjectCard } from './ProjectCard'

type ProjectListProps = {
  projects: ProjectItem[]
  onEdit: (project: ProjectItem) => void
  onDelete: (projectId: string) => void
}

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" role="presentation">
            <rect x="14" y="10" width="36" height="44" rx="10" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M23 24h18M23 32h18M23 40h10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="49" cy="47" r="9" fill="#ffffff" stroke="currentColor" strokeWidth="3" />
            <path d="M49 43v8M45 47h8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <h3>No projects yet</h3>
        <p>Use the form to create your first project and it will appear here.</p>
      </div>
    )
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
