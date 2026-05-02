import type { ComponentType } from 'react'
import {
  SiBootstrap,
  SiCss,
  SiDocker,
  SiEslint,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiGitlab,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiMongoose,
  SiMui,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPnpm,
  SiPostgresql,
  SiPostman,
  SiPrettier,
  SiPrisma,
  SiReact,
  SiRedis,
  SiRedux,
  SiSass,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVitest,
  SiVite,
  SiYarn,
} from 'react-icons/si'

export type TechStackKey =
  | 'react'
  | 'node'
  | 'express'
  | 'mongodb'
  | 'mongoose'
  | 'typescript'
  | 'vite'
  | 'javascript'
  | 'html'
  | 'css'
  | 'nextjs'
  | 'tailwind'
  | 'redux'
  | 'prisma'
  | 'postgresql'
  | 'mysql'
  | 'redis'
  | 'graphql'
  | 'socketio'
  | 'jwt'
  | 'docker'
  | 'firebase'
  | 'supabase'
  | 'vercel'
  | 'netlify'
  | 'npm'
  | 'yarn'
  | 'pnpm'
  | 'eslint'
  | 'prettier'
  | 'jest'
  | 'vitest'
  | 'sass'
  | 'bootstrap'
  | 'mui'
  | 'github'
  | 'gitlab'
  | 'figma'
  | 'postman'

export type TechStackOption = {
  key: TechStackKey
  label: string
  Icon: ComponentType<{ className?: string }>
}

export const TECH_STACK_OPTIONS: TechStackOption[] = [
  { key: 'react', label: 'React', Icon: SiReact },
  { key: 'node', label: 'Node.js', Icon: SiNodedotjs },
  { key: 'express', label: 'Express', Icon: SiExpress },
  { key: 'mongodb', label: 'MongoDB', Icon: SiMongodb },
  { key: 'mongoose', label: 'Mongoose', Icon: SiMongoose },
  { key: 'typescript', label: 'TypeScript', Icon: SiTypescript },
  { key: 'vite', label: 'Vite', Icon: SiVite },
  { key: 'nextjs', label: 'Next.js', Icon: SiNextdotjs },
  { key: 'tailwind', label: 'Tailwind CSS', Icon: SiTailwindcss },
  { key: 'javascript', label: 'JavaScript', Icon: SiJavascript },
  { key: 'html', label: 'HTML', Icon: SiHtml5 },
  { key: 'css', label: 'CSS', Icon: SiCss },
  { key: 'redux', label: 'Redux', Icon: SiRedux },
  { key: 'prisma', label: 'Prisma', Icon: SiPrisma },
  { key: 'postgresql', label: 'PostgreSQL', Icon: SiPostgresql },
  { key: 'mysql', label: 'MySQL', Icon: SiMysql },
  { key: 'redis', label: 'Redis', Icon: SiRedis },
  { key: 'graphql', label: 'GraphQL', Icon: SiGraphql },
  { key: 'socketio', label: 'Socket.io', Icon: SiSocketdotio },
  { key: 'jwt', label: 'JWT', Icon: SiJsonwebtokens },
  { key: 'docker', label: 'Docker', Icon: SiDocker },
  { key: 'firebase', label: 'Firebase', Icon: SiFirebase },
  { key: 'supabase', label: 'Supabase', Icon: SiSupabase },
  { key: 'vercel', label: 'Vercel', Icon: SiVercel },
  { key: 'netlify', label: 'Netlify', Icon: SiNetlify },
  { key: 'npm', label: 'npm', Icon: SiNpm },
  { key: 'yarn', label: 'Yarn', Icon: SiYarn },
  { key: 'pnpm', label: 'pnpm', Icon: SiPnpm },
  { key: 'eslint', label: 'ESLint', Icon: SiEslint },
  { key: 'prettier', label: 'Prettier', Icon: SiPrettier },
  { key: 'jest', label: 'Jest', Icon: SiJest },
  { key: 'vitest', label: 'Vitest', Icon: SiVitest },
  { key: 'sass', label: 'Sass', Icon: SiSass },
  { key: 'bootstrap', label: 'Bootstrap', Icon: SiBootstrap },
  { key: 'mui', label: 'MUI', Icon: SiMui },
  { key: 'github', label: 'GitHub', Icon: SiGithub },
  { key: 'gitlab', label: 'GitLab', Icon: SiGitlab },
  { key: 'figma', label: 'Figma', Icon: SiFigma },
  { key: 'postman', label: 'Postman', Icon: SiPostman },
]

export const TECH_STACK_ICON_BY_KEY: Record<TechStackKey, TechStackOption['Icon']> =
  TECH_STACK_OPTIONS.reduce(
    (acc, option) => {
      acc[option.key] = option.Icon
      return acc
    },
    {} as Record<TechStackKey, TechStackOption['Icon']>,
  )
