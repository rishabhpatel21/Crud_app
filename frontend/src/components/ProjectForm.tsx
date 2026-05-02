import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-magic-ui'
import { LuPlus, LuX } from 'react-icons/lu'
import type { ProjectStatus } from '../types/project'
import { TECH_STACK_OPTIONS } from '../data/techStack'
import type { ProjectFormValues } from '../hooks/useProjectManager'

type ProjectFormProps = {
  initialValues: ProjectFormValues
  isEditing: boolean
  onSubmit: (values: ProjectFormValues) => Promise<void> | void
  onCancel: () => void
}

const statusOptions: Array<{ value: ProjectStatus; label: string }> = [
  { value: 'pending', label: 'PENDING' },
  { value: 'in-progress', label: 'IN PROGRESS' },
  { value: 'complete', label: 'COMPLETE' },
]

const validationSchema = Yup.object({
  title: Yup.string().trim().required('Title is required.'),
  description: Yup.string().trim().required('Description is required.'),
  status: Yup.mixed<ProjectStatus>().oneOf(['pending', 'in-progress', 'complete']).required(),
  techStack: Yup.array().of(Yup.string().trim()).default([]),
})

export function ProjectForm({
  initialValues,
  isEditing,
  onSubmit,
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

  const formik = useFormik<ProjectFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      await onSubmit(values)
      helpers.resetForm()
      setIsStatusOpen(false)
      setIsTechOpen(false)
      setTechQuery('')
    },
  })

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
    statusOptions.find((option) => option.value === formik.values.status)?.label ?? 'Select an option'

  const toggleTech = (key: string) => {
    const normalized = key.trim().toLowerCase()
    if (!normalized) {
      return
    }

    if (formik.values.techStack.includes(normalized)) {
      void formik.setFieldValue(
        'techStack',
        formik.values.techStack.filter((item) => item !== normalized),
      )
      return
    }

    void formik.setFieldValue('techStack', [...formik.values.techStack, normalized])
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

  const selectedTechLabel = formik.values.techStack.length
    ? `${formik.values.techStack.length} selected`
    : 'Select tech stack'

  const filteredTechOptions = TECH_STACK_OPTIONS.filter(({ label, key }) => {
    const query = techQuery.trim().toLowerCase()
    if (!query) {
      return true
    }
    return label.toLowerCase().includes(query) || key.toLowerCase().includes(query)
  })

  return (
    <form onSubmit={formik.handleSubmit} className="project-form">
      <label>
        Title
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Project title"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Project description"
        />
      </label>

      <label>
        Status
        <div className="select-field custom-select" ref={statusMenuRef}>
          <button
            type="button"
            className={`status-select-trigger ${isStatusOpen ? 'open' : ''} ${formik.values.status ? '' : 'placeholder'}`}
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
                const isSelected = option.value === formik.values.status

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`status-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      void formik.setFieldValue('status', option.value)
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
            className={`tech-select-trigger ${isTechOpen ? 'open' : ''} ${formik.values.techStack.length ? '' : 'placeholder'}`}
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
                {formik.values.techStack.length ? (
                  <button
                    type="button"
                    className="tech-clear"
                    onClick={() => void formik.setFieldValue('techStack', [])}
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              <div className="tech-options-grid">
                {filteredTechOptions.map(({ key, label, Icon }) => {
                  const isSelected = formik.values.techStack.includes(key)

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
          disabled={!formik.isValid || formik.isSubmitting}
        >
          <LuPlus className="icon" strokeWidth={2.5} />
          {isEditing ? 'Save changes' : 'Create project'}
        </Button>

        <Button
          type="button"
          className="a-button a-button--default a-button-anime btn secondary btn-icon"
          variant="default"
          size="medium"
          onClick={() => {
            formik.resetForm()
            onCancel()
          }}
          disabled={!isEditing && !formik.dirty}
        >
          <LuX className="icon" strokeWidth={2.5} />
          {isEditing ? 'Cancel' : 'Clear'}
        </Button>
      </div>
    </form>
  )
}
