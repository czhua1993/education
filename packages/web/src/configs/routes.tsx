import React from 'react'

import BasicLayout from '../layouts/basic'
import { printRoutes } from '../modules/print/routes'

const HomePage = React.lazy(() => import('../pages/home'))

export const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        component: HomePage,
      },
    ],
  },
  ...printRoutes,
]
