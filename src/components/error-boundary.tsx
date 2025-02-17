import type { ReactNode, ErrorInfo } from 'react'
import { Component } from 'react'
import { ErrorMessage } from './ui/error'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In a real app, you would send this to an error reporting service
    console.error('Error caught by boundary:', {
      error,
      componentStack: errorInfo.componentStack
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
          <ErrorMessage
            message={this.state.error?.message || 'An unexpected error occurred'}
            className="mb-4 max-w-xl"
          />
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
