import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'

import { ErrorMessage } from '@/components/ui/error'

import { getMovieById } from '@movie/api/omdb'
import { MovieDetails } from '@/features/movie/components/details'
import { MovieDetailsError } from '@/features/movie/components/details/error'
import { MovieDetailsSkeleton } from '@/features/movie/components/details/skeleton'

const movieQueryOptions = (movieId: string) =>
  queryOptions({
    queryKey: ['movies', movieId],
    queryFn: () => getMovieById(movieId)
  })

export const Route = createFileRoute('/$movieId')({
  // tanstack router loader function
  loader: ({ context: { queryClient }, params: { movieId } }) => {
    return queryClient.ensureQueryData(movieQueryOptions(movieId))
  },
  errorComponent: MovieDetailsError,
  component: MovieInformation
})

function MovieInformation() {
  const { movieId } = Route.useParams()

  const {
    data: movie,
    isFetching,
    isPending,
    isError,
    error
  } = useSuspenseQuery(movieQueryOptions(movieId))

  if (isFetching || isPending) {
    return <MovieDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : 'Failed to load movie details. Please try again.'
        }
      />
    )
  }

  if (!movie) {
    return <div>Movie not found</div>
  }

  return <MovieDetails movie={movie} />
}
