import { useEffect } from 'react'
import { useRouter, ErrorComponent } from '@tanstack/react-router'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function MovieDetailsError({ error }: ErrorComponentProps) {
  const router = useRouter()

  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  if (error instanceof Error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <Button variant="link" onClick={() => router.invalidate()}>
        <RefreshCw />
        Retry
      </Button>

      <ErrorComponent error={error} />
    </div>
  )
}
