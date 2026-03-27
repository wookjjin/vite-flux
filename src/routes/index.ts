import { createBrowserRouter } from "react-router"

import Home from '@/pages'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home
  }
])

export default router