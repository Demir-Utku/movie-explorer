import { useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { ErrorMessage } from '@/components/ui/error'

import { MovieTable } from './table'
import { MovieTableSkeleton } from './table/skeleton'
import { MoviePagination } from './pagination'

import { getMovies } from '../api/omdb'
import { useAppSelector, useAppDispatch } from '../hooks/useStore'
import { setPage } from '../movie-slice'

export function MovieList() {
  const { search, year, type, page } = useAppSelector(state => state.movie)

  const dispatch = useAppDispatch()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['movies', search, year, type, page],
    queryFn: () => getMovies({ search, year, type, page }),
    enabled: search.length > 0,
    placeholderData: keepPreviousData
  })

  const totalPages = data?.totalResults ? Math.ceil(Number.parseInt(data.totalResults) / 10) : 0

  function handlePageChange(page: number) {
    dispatch(setPage(page))
  }

  useEffect(() => {
    if (isError) {
      dispatch(setPage(1))
    }
  }, [dispatch, isError])

  if (search.length === 0) {
    return <div className="text-center text-neutral-600">Enter a search term to find movies</div>
  }

  if (isPending) {
    return <MovieTableSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : 'Failed to load movies. Please try again.'
        }
      />
    )
  }

  if (data.totalResults === '0') {
    return (
      <div className="text-center text-neutral-600">
        No movies found matching your search criteria
      </div>
    )
  }

  return (
    <>
      <MovieTable data={data} />

      <MoviePagination
        currentPage={page ?? 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
