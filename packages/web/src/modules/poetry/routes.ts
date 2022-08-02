import React from 'react'

import BasicLayout from '@/layouts/basic'

const PoetryLibrary = React.lazy(() => import('./pages/library'))

export const poetryRoutes = [
  {
    path: 'poetry',
    component: BasicLayout,
    children: [
      {
        path: 'library',
        component: PoetryLibrary,
      },
    ],
  },
]
