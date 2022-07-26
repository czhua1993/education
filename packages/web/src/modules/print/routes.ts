import React from 'react'

import BasicLayout from '@/layouts/basic'

const PrintIndex = React.lazy(() => import('./pages/index'))

export const printRoutes = [
  {
    path: 'print',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: PrintIndex,
      },
    ],
  },
]
