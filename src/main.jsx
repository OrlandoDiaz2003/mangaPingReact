import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Index from './pages/Index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
	<Index/>
  </StrictMode>,
)
