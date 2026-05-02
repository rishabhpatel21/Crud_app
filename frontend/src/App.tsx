import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import { PanelHeader } from './components/PanelHeader'
import { useProjectManager } from './hooks/useProjectManager'

const HeroSection = lazy(() =>
  import('./components/HeroSection').then((module) => ({ default: module.HeroSection })),
)

const ProjectForm = lazy(() =>
  import('./components/ProjectForm').then((module) => ({ default: module.ProjectForm })),
)

const ProjectList = lazy(() =>
  import('./components/ProjectList').then((module) => ({ default: module.ProjectList })),
)

function HeroSkeleton() {
  return (
    <header className="hero-card skeleton-shell">
      <div className="hero-intro">
        <div className="skeleton-line skeleton-line--eyebrow" />
        <div className="skeleton-line skeleton-line--title" />
        <div className="skeleton-line skeleton-line--title short" />
        <div className="skeleton-line skeleton-line--body" />
        <div className="skeleton-line skeleton-line--body medium" />
      </div>

      <div className="hero-actions">
        <div className="hero-metric skeleton-card" />
        <div className="hero-metric skeleton-card" />
        <div className="hero-metric skeleton-card" />
      </div>
    </header>
  )
}

function FormSkeleton() {
  return (
    <div className="project-form skeleton-form" aria-hidden="true">
      <div className="skeleton-field-group">
        <div className="skeleton-line skeleton-line--label" />
        <div className="skeleton-input" />
      </div>

      <div className="skeleton-field-group">
        <div className="skeleton-line skeleton-line--label" />
        <div className="skeleton-textarea" />
      </div>

      <div className="skeleton-field-group">
        <div className="skeleton-line skeleton-line--label" />
        <div className="skeleton-input" />
      </div>

      <div className="form-actions">
        <div className="skeleton-button" />
      </div>
    </div>
  )
}

function ProjectListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="project-list skeleton-list" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="project-card skeleton-card-frame">
          <div className="project-card-copy">
            <div className="skeleton-pill" />
            <div className="skeleton-line skeleton-line--card-title" />
            <div className="skeleton-line skeleton-line--card-body" />
            <div className="skeleton-line skeleton-line--card-body short" />
          </div>

          <div className="project-card-actions">
            <div className="skeleton-icon-button" />
            <div className="skeleton-icon-button" />
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [isMounted, setIsMounted] = useState(false)
  const {
    projects,
    isEditing,
    isLoading,
    errorMessage,
    initialValues,
    saveProject,
    startEditing,
    deleteProject,
    resetForm,
  } = useProjectManager()

  useEffect(() => {
    window.requestAnimationFrame(() => setIsMounted(true))
  }, [])

  return (
    <main className={`app-shell ${isMounted ? 'mounted' : 'hidden'}`}>
      <div className="app-scroll-frame">
        <div className="app-scroll-content">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection
            total={projects.length}
            completed={projects.filter((p) => p.status === 'complete').length}
            inProgress={projects.filter((p) => p.status === 'in-progress').length}
            pending={projects.filter((p) => p.status === 'pending').length}
          />
        </Suspense>

        <section className="panel-grid">
          <article className="panel form-panel">
            <PanelHeader
              title={isEditing ? 'Edit project' : 'New project'}
              description={isEditing ? 'Update the fields and save changes.' : 'Create a new item for your workflow.'}
            />
            <Suspense fallback={<FormSkeleton />}>
              <ProjectForm
                initialValues={initialValues}
                isEditing={isEditing}
                onSubmit={saveProject}
                onCancel={resetForm}
              />
            </Suspense>
          </article>

          <article className="panel list-panel">
            <PanelHeader
              title="Project list"
              description={`${projects.length} ${projects.length === 1 ? 'item' : 'items'} in the collection.`}
            />
            {errorMessage ? <p className="status-message error-message">{errorMessage}</p> : null}
            {isLoading ? <ProjectListSkeleton /> : null}
            {!isLoading ? (
              <Suspense fallback={<ProjectListSkeleton count={2} />}>
                <ProjectList projects={projects} onEdit={startEditing} onDelete={deleteProject} />
              </Suspense>
            ) : null}
          </article>
        </section>
      </div>
        </div>
    </main>
  )
}

export default App
