import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { TasksDataContextProvider } from './contexts/tasks-context.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster position='top-right' richColors />
      <QueryClientProvider client={queryClient}>
        <TasksDataContextProvider>
          <App />
        </TasksDataContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
