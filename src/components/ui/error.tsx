import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

export function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  className,
  ...props
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700',
        className
      )}
      {...props}
    >
      <AlertCircle className="h-5 w-5" />
      <p>{message}</p>
    </div>
  )
}
