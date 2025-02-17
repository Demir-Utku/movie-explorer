import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function MovieDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <Button variant="ghost" disabled>
          <ArrowLeft /> Back to Search
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_minmax(0,1fr)] gap-y-6 sm:gap-8 lg:gap-10">
        <Skeleton className="w-full h-[450px] rounded-lg" />

        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-2/3 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-2/3 mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4">
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
