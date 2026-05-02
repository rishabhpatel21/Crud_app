import type { ProjectStatus } from '../types/project'

type StatusPillProps = {
  status: ProjectStatus
}

export function StatusPill({ status }: StatusPillProps) {
  return <span className={`status-pill status-${status}`}>{status}</span>
}
