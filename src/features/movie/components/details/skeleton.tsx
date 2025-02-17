import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function MovieDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" disabled>
          <ArrowLeft /> Back to Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <Skeleton className="w-full h-[450px] rounded-lg" />

        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-2/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-2/3 mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
