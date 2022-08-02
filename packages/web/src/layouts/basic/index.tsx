import React from 'react'
import { Outlet } from 'react-router-dom'

import { PageContainer } from '@ant-design/pro-layout'

interface BasicLayoutProps {
  children?: React.ReactNode
}

export default function BasicLayout(props: BasicLayoutProps) {
  const { children = <Outlet /> } = props
  return <PageContainer title={false}>{children}</PageContainer>
}
