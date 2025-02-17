import { createFileRoute } from '@tanstack/react-router'

import { MovieFilters } from '@movie/components/filters'
import { MovieList } from '@movie/components/movie-list'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div className="flex flex-col gap-8">
      <MovieFilters />

      <MovieList />
    </div>
  )
}
