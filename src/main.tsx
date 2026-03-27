import { createRoot } from 'react-dom/client'
import { Outlet } from 'react-router';
import { RouterProvider } from "react-router/dom";

import router from '@/routes'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} >
    <Outlet />
  </RouterProvider>
)

