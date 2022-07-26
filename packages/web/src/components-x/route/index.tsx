import React, { Suspense } from 'react'
import { Outlet, Route as ReactRoute } from 'react-router-dom'

import { ErrorBoundary } from '@/components/error-boundary'
import { Loading } from '@/components/loading'

export interface RouteProps {
  path: string
  component?: React.ComponentType
  children?: RouteProps[]
}

const DefaultComponent = () => <Outlet />

export const Route = (props: RouteProps) => {
  const { path, component: RouteComponent = DefaultComponent, children } = props

  return (
    <ReactRoute
      key={path}
      path={path}
      element={
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <RouteComponent />
          </Suspense>
        </ErrorBoundary>
      }
    >
      {children?.map((child) => Route(child))}
    </ReactRoute>
  )
}
