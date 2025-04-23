import './globals.css'
import router from './router/index'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './components/ui/theme-provider'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system" storageKey="people-forum-theme">
    <Toaster />
    <RouterProvider router={router} />
  </ThemeProvider>
)
