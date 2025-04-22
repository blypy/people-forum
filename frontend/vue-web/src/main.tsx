import { createRoot } from 'react-dom/client'
import './globals.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
)
