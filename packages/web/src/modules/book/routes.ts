import React from 'react'

import BasicLayout from '@/layouts/basic'

const BookIndex = React.lazy(() => import('./pages/index'))
const BookList = React.lazy(() => import('./pages/list'))
const BookDetail = React.lazy(() => import('./pages/detail'))
const BookPrint = React.lazy(() => import('./pages/print'))
const BookPDF = React.lazy(() => import('./pages/pdf'))

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
        path: 'list/:name',
        component: BookDetail,
      },
      {
        path: 'print/:name',
        component: BookPrint,
      },
      {
        path: 'pdf/:name',
        component: BookPDF,
      },
    ],
  },
]
