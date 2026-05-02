import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'animate-ui/dist/animate-ui.css'
import 'react-magic-ui/dist/react-magic-ui.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
