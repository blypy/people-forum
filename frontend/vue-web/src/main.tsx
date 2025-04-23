import { createRoot } from 'react-dom/client'
import './globals.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from './components/ui/theme-provider'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system" storageKey="people-forum-theme">
    <Toaster />
    <RouterProvider router={router} />
  </ThemeProvider>
)
