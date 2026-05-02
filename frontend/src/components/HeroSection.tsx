import { BsClipboardData } from 'react-icons/bs'
import { HiCheckCircle } from 'react-icons/hi'
import { MdOutlineAutorenew } from 'react-icons/md'
import { LuClock3 } from 'react-icons/lu'

type HeroSectionProps = {
  total: number
  completed: number
  inProgress: number
  pending: number
}

export function HeroSection({ total, completed, inProgress, pending }: HeroSectionProps) {
  return (
    <header className="hero-card">
      <div className="hero-intro">
        <p className="eyebrow">Project CRUD Experience</p>
        <h1>Clear, calm, and confident task management.</h1>
        <p className="hero-copy">
          A polished workspace for creating, editing, and tracking project work in a beautiful, focused UI.
          The experience balances clarity, motion, and hierarchy so every action feels intentional.
        </p>
      </div>

      <div className="hero-actions">
        <div className="hero-metric hero-metric--total">
          <div className="hero-metric__header">
            <span className="hero-metric__icon"><BsClipboardData /></span>
            <span className="hero-metric__label">Total Projects</span>
          </div>
          <strong>{total}</strong>
        </div>
        <div className="hero-metric hero-metric--complete">
          <div className="hero-metric__header">
            <span className="hero-metric__icon"><HiCheckCircle /></span>
            <span className="hero-metric__label">Completed</span>
          </div>
          <strong>{completed}</strong>
        </div>
        <div className="hero-metric hero-metric--progress">
          <div className="hero-metric__header">
            <span className="hero-metric__icon"><MdOutlineAutorenew /></span>
            <span className="hero-metric__label">In Progress</span>
          </div>
          <strong>{inProgress}</strong>
        </div>
        <div className="hero-metric hero-metric--pending">
          <div className="hero-metric__header">
            <span className="hero-metric__icon"><LuClock3 /></span>
            <span className="hero-metric__label">Pending</span>
          </div>
          <strong>{pending}</strong>
        </div>
      </div>
    </header>
  )
}
