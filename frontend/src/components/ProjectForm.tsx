import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { Button } from 'react-magic-ui'
import { LuPlus, LuX } from 'react-icons/lu'
import type { ProjectStatus } from '../types/project'
import { TECH_STACK_OPTIONS } from '../data/techStack'

type ProjectFormProps = {
  title: string
  description: string
  status: ProjectStatus | ''
  techStack: string[]
  isEditing: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onStatusChange: (value: ProjectStatus | '') => void
  onTechStackChange: (value: string[]) => void
  onCancel: () => void
}

const statusOptions: Array<{ value: ProjectStatus; label: string }> = [
  { value: 'pending', label: 'PENDING' },
  { value: 'in-progress', label: 'IN PROGRESS' },
  { value: 'complete', label: 'COMPLETE' },
]

export function ProjectForm({
  title,
  description,
  status,
  techStack,
  isEditing,
  onSubmit,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onTechStackChange,
  onCancel,
}: ProjectFormProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isTechOpen, setIsTechOpen] = useState(false)
  const [techQuery, setTechQuery] = useState('')
  const [opensUpward, setOpensUpward] = useState(false)
  const statusMenuRef = useRef<HTMLDivElement | null>(null)
  const statusDropdownRef = useRef<HTMLDivElement | null>(null)
  const techMenuRef = useRef<HTMLDivElement | null>(null)
  const techDropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!statusMenuRef.current?.contains(event.target as Node)) {
        setIsStatusOpen(false)
      }

      if (!techMenuRef.current?.contains(event.target as Node)) {
        setIsTechOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  useLayoutEffect(() => {
    if (!isStatusOpen && !isTechOpen) {
      setOpensUpward(false)
      return
    }

    const updateDropdownDirection = () => {
      const trigger = isTechOpen ? techMenuRef.current : statusMenuRef.current
      const dropdown = isTechOpen ? techDropdownRef.current : statusDropdownRef.current

      if (!trigger || !dropdown) {
        return
      }

      const triggerRect = trigger.getBoundingClientRect()
      const dropdownHeight = dropdown.offsetHeight
      const spaceBelow = window.innerHeight - triggerRect.bottom
      const spaceAbove = triggerRect.top
      const shouldOpenUpward =
        spaceBelow < dropdownHeight + 16 && spaceAbove > spaceBelow

      setOpensUpward(shouldOpenUpward)
    }

    updateDropdownDirection()
    window.addEventListener('resize', updateDropdownDirection)
    window.addEventListener('scroll', updateDropdownDirection, true)

    return () => {
      window.removeEventListener('resize', updateDropdownDirection)
      window.removeEventListener('scroll', updateDropdownDirection, true)
    }
  }, [isStatusOpen, isTechOpen])

  const selectedStatusLabel =
    statusOptions.find((option) => option.value === status)?.label ?? 'Select an option'

  const isFormValid = title.trim() !== '' && description.trim() !== '' && status !== ''
  const isFormDirty =
    title.trim() !== '' || description.trim() !== '' || status !== '' || techStack.length > 0

  const toggleTech = (key: string) => {
    const normalized = key.trim().toLowerCase()
    if (!normalized) {
      return
    }

    if (techStack.includes(normalized)) {
      onTechStackChange(techStack.filter((item) => item !== normalized))
      return
    }

    onTechStackChange([...techStack, normalized])
  }

  const handleStatusKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsStatusOpen(true)
    }

    if (event.key === 'Escape') {
      setIsStatusOpen(false)
    }
  }

  const selectedTechLabel = techStack.length
    ? `${techStack.length} selected`
    : 'Select tech stack'

  const filteredTechOptions = TECH_STACK_OPTIONS.filter(({ label, key }) => {
    const query = techQuery.trim().toLowerCase()
    if (!query) {
      return true
    }
    return label.toLowerCase().includes(query) || key.toLowerCase().includes(query)
  })

  return (
    <form onSubmit={onSubmit} className="project-form">
      <label>
        Title
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Project title"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Project description"
        />
      </label>

      <label>
        Status
        <div className="select-field custom-select" ref={statusMenuRef}>
          <button
            type="button"
            className={`status-select-trigger ${isStatusOpen ? 'open' : ''} ${status ? '' : 'placeholder'}`}
            onClick={() => setIsStatusOpen((current) => !current)}
            onKeyDown={handleStatusKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isStatusOpen}
          >
            <span>{selectedStatusLabel}</span>
          </button>

          {isStatusOpen ? (
            <div
              ref={statusDropdownRef}
              className={`status-dropdown ${opensUpward ? 'open-upward' : ''}`}
              role="listbox"
              aria-label="Project status"
            >
              {statusOptions.map((option) => {
                const isSelected = option.value === status

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`status-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onStatusChange(option.value)
                      setIsStatusOpen(false)
                    }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="status-option-check" aria-hidden="true">
                      {isSelected ? '✓' : ''}
                    </span>
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>
      </label>

      <label>
        Tech stack
        <div className="select-field custom-select" ref={techMenuRef}>
          <button
            type="button"
            className={`tech-select-trigger ${isTechOpen ? 'open' : ''} ${techStack.length ? '' : 'placeholder'}`}
            onClick={() => {
              setIsTechOpen((current) => !current)
              setTechQuery('')
            }}
            aria-haspopup="listbox"
            aria-expanded={isTechOpen}
          >
            <span>{selectedTechLabel}</span>
          </button>

          {isTechOpen ? (
            <div
              ref={techDropdownRef}
              className={`tech-dropdown ${opensUpward ? 'open-upward' : ''}`}
              role="listbox"
              aria-label="Tech stack"
            >
              <div className="tech-dropdown__header">
                <input
                  value={techQuery}
                  onChange={(event) => setTechQuery(event.target.value)}
                  placeholder="Search tech..."
                  className="tech-search"
                />
                {techStack.length ? (
                  <button
                    type="button"
                    className="tech-clear"
                    onClick={() => onTechStackChange([])}
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              <div className="tech-options-grid">
                {filteredTechOptions.map(({ key, label, Icon }) => {
                  const isSelected = techStack.includes(key)

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`tech-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleTech(key)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <Icon className="tech-option__icon" aria-hidden="true" />
                      <span className="tech-option__label">{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      </label>

      <div className="form-actions">
        <Button
          type="submit"
          className="a-button a-button--primary a-button-anime btn primary btn-icon"
          variant="positive"
          size="medium"
          enableLiquidAnimation
          disabled={!isFormValid}
        >
          <LuPlus className="icon" strokeWidth={2.5} />
          {isEditing ? 'Save changes' : 'Create project'}
        </Button>

        <Button
          type="button"
          className="a-button a-button--default a-button-anime btn secondary btn-icon"
          variant="default"
          size="medium"
          onClick={onCancel}
          disabled={!isEditing && !isFormDirty}
        >
          <LuX className="icon" strokeWidth={2.5} />
          {isEditing ? 'Cancel' : 'Clear'}
        </Button>
      </div>
    </form>
  )
}
