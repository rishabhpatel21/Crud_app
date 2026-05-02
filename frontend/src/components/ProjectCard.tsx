import { Button } from 'react-magic-ui'
import { LuPencil } from 'react-icons/lu'
import { RiDeleteBin6Line } from 'react-icons/ri'
import type { ProjectItem } from '../types/project'
import { StatusPill } from './StatusPill'
import { TECH_STACK_ICON_BY_KEY } from '../data/techStack'

type ProjectCardProps = {
  project: ProjectItem
  onEdit: (project: ProjectItem) => void
  onDelete: (projectId: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const techStack = Array.isArray(project.techStack) ? project.techStack : []
  return (
    <div className="project-card shimmer-card">
      <div className="project-card-copy">
        <StatusPill status={project.status} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {techStack.length ? (
          <div className="tech-stack" aria-label="Tech stack">
            {techStack.map((rawKey) => {
              const key = rawKey.trim().toLowerCase()
              const Icon = (TECH_STACK_ICON_BY_KEY as Record<string, (typeof TECH_STACK_ICON_BY_KEY)[keyof typeof TECH_STACK_ICON_BY_KEY]>)[key]
              if (!Icon) {
                return null
              }
              return (
                <span key={key} className="tech-stack-icon" title={key}>
                  <Icon aria-hidden="true" />
                </span>
              )
            })}
          </div>
        ) : null}
      </div>

      <div className="project-card-actions">
        <Button
          type="button"
          rootClassName="icon-button-shell"
          className="icon-button icon-button--muted"
          variant="default"
          size="small"
          onClick={() => onEdit(project)}
          aria-label="Edit project"
        >
          <LuPencil className="icon" />
        </Button>

        <Button
          type="button"
          rootClassName="icon-button-shell"
          className="icon-button icon-button--danger"
          variant="negative"
          size="small"
          onClick={() => onDelete(project.id)}
          aria-label="Delete project"
        >
          <RiDeleteBin6Line className="icon" />
        </Button>
      </div>
    </div>
  )
}
