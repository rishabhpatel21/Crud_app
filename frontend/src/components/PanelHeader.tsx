type PanelHeaderProps = {
  title: string
  description: string
}

export function PanelHeader({ title, description }: PanelHeaderProps) {
  return (
    <div className="panel-header">
      <h2>{title}</h2>
      <p>{description}</p>
      <hr className="panel-divider" />
    </div>
  )
}
