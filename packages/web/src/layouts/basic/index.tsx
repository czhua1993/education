import React from 'react'
import { Outlet } from 'react-router-dom'

interface BasicLayoutProps {
  children?: React.ReactNode
}

export default function BasicLayout(props: BasicLayoutProps) {
  const { children = <Outlet /> } = props
  return <>{children}</>
}
