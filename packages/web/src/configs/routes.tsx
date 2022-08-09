import React from 'react'

import { bookRoutes } from '@/modules/book/routes'
import { poetryRoutes } from '@/modules/poetry/routes'
import {
  BookOutlined,
  HomeOutlined,
  PrinterOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'

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
  ...poetryRoutes,
  ...bookRoutes,
]

export const menu = [
  {
    path: '/',
    name: '主页',
    icon: <HomeOutlined />,
  },
  {
    path: '/poetry',
    name: '中国诗词',
    icon: <SnippetsOutlined />,
    routes: [
      {
        path: '/poetry/library',
        name: '诗词库',
      },
      {
        path: '/poetry/mine',
        name: '我的诗词',
      },
    ],
  },
  {
    path: '/book',
    name: '儿童书籍',
    icon: <BookOutlined />,
    routes: [
      {
        path: '/book/list',
        name: '书本列表',
      },
    ],
  },
  {
    path: '/print',
    name: '打印资料',
    icon: <PrinterOutlined />,
    routes: [
      {
        path: '/print/country',
        name: '世界国家',
      },
      {
        path: '/print/city',
        name: '省市区',
      },
      {
        path: '/print/word',
        name: '认识汉字',
      },
    ],
  },
]
