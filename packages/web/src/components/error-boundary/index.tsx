import React from 'react'

interface IProps {
  children: React.ReactNode
}

interface IState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-error">Error page</div>
    }

    return this.props.children
  }
}
