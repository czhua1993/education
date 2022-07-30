import React from 'react'

import BasicLayout from '@/layouts/basic'

const PrintIndex = React.lazy(() => import('./pages/index'))
const PrintCountry = React.lazy(() => import('./pages/country'))
const PrintPoetry = React.lazy(() => import('./pages/poetry'))
const PrintWord = React.lazy(() => import('./pages/word'))

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
      {
        path: 'poetry',
        component: PrintPoetry,
      },
      {
        path: 'word',
        component: PrintWord,
      },
    ],
  },
]
