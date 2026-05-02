import { Button } from 'react-magic-ui'
import { LuPencil } from 'react-icons/lu'
import { RiDeleteBin6Line } from 'react-icons/ri'
import type { ProjectItem } from '../types/project'
import { StatusPill } from './StatusPill'

type ProjectCardProps = {
  project: ProjectItem
  onEdit: (project: ProjectItem) => void
  onDelete: (projectId: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="project-card shimmer-card">
      <div className="project-card-copy">
        <StatusPill status={project.status} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
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
