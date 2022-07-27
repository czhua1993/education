import React from 'react'

import BasicLayout from '@/layouts/basic'

const PrintIndex = React.lazy(() => import('./pages/index'))
const PrintCountry = React.lazy(() => import('./pages/country'))

export const printRoutes = [
  {
    path: 'print',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: PrintIndex,
      },
      {
        path: 'country',
        component: PrintCountry,
      },
    ],
  },
]
