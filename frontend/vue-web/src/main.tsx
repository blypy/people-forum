import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from './components/ui/theme-provider'
import './globals.css'
import queryClient from './lib/query'
import router from './router/index'
import { ReactLenis } from 'lenis/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="people-forum-theme">
      <ReactLenis root>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ReactLenis>
    </ThemeProvider>
  </StrictMode>
)
