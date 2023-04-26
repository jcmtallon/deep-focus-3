import React, { ErrorInfo, ReactNode } from 'react'
import { ErrorDisplay } from './ErrorDisplay'

interface ErrorBoundaryProps {
  children?: ReactNode
  error?: ReactNode
}

interface ErrorBoundaryState {
  hasError: false
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // eslint-disable-next-line react/state-in-constructor -- TODO: transform into constructor?
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: Add error to error tracking system like:
    // datadogRum.addError(error, errorInfo)

    // For now:
    // eslint-disable-next-line no-console
    console.log(error, errorInfo)
  }

  render() {
    return this.state.hasError ? this.props.error ?? <ErrorDisplay showAction /> : this.props.children
  }
}

export { ErrorBoundary }
export type { ErrorBoundaryProps }
