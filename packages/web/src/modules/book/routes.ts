import React from 'react'

import BasicLayout from '@/layouts/basic'

const BookIndex = React.lazy(() => import('./pages/index'))
const BookList = React.lazy(() => import('./pages/list'))
const BookDetail = React.lazy(() => import('./pages/detail'))

export const bookRoutes = [
  {
    path: 'book',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: BookIndex,
      },
      {
        path: 'list',
        component: BookList,
      },
      {
        path: 'list/:code',
        component: BookDetail,
      },
    ],
  },
]
