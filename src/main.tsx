import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './styles/tokens.css'
import './styles/global.css'
import './styles/experience.css'
import App from './App'
import { LocaleProvider } from './i18n/LocaleProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider><App /></LocaleProvider>
    {import.meta.env.PROD && <SpeedInsights />}
  </StrictMode>,
)
