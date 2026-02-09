import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import { TaskProvider } from './hooks/useTasksContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
      <App></App>
    </TaskProvider>
  </StrictMode>,
)
