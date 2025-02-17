import './table.scss'

import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'

import { cn } from '@/utils/cn'

import { columns } from './columns'

import { getMovieById } from '../../api/omdb'
import type { MovieSearchResponse } from '../../types'

const columnWidths = {
  Poster: 'w-16 min-w-[4rem]',
  Title: 'w-[40%] min-w-[15rem] md:min-w-[20rem]',
  Year: 'w-[15%] min-w-[6.25rem] md:min-w-[7.5rem]',
  Type: 'w-[15%] min-w-[6.25rem] md:min-w-[7.5rem]',
  imdbID: 'w-[20%] min-w-[7.5rem] md:min-w-[10rem]'
}

export function MovieTable({ data }: { data?: MovieSearchResponse }) {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  async function prefetchMovieDetailsQuery(movieId: string) {
    await queryClient.prefetchQuery({
      queryKey: ['movies', movieId],
      queryFn: () => getMovieById(movieId),
      // Movie details are unlikely to change, so we can cache them for a long time
      staleTime: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    })
  }

  return (
    <div className="overflow-x-auto min-w-full">
      <table className="ui-table table-fixed">
        <thead className="bg-gray-100">
          <tr className="font-semibold text-gray-700 text-sm">
            {columns.map(column => (
              <th key={column.key} className={cn(['px-3 py-2', columnWidths[column.key]])}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {!!data && data.totalResults ? (
            data.Search.map(movie => (
              <tr
                key={movie.imdbID}
                role="link"
                onMouseEnter={() => prefetchMovieDetailsQuery(movie.imdbID)}
                onFocus={() => prefetchMovieDetailsQuery(movie.imdbID)}
                onClick={() => navigate({ to: `/${movie.imdbID}` })}
              >
                {columns.map(column => (
                  <td
                    key={column.key}
                    className={cn([
                      'px-3 py-2',
                      columnWidths[column.key],
                      { capitalize: column.key === 'Type' }
                    ])}
                  >
                    {column.key === 'Poster' ? (
                      <img
                        src={
                          movie[column.key] === 'N/A'
                            ? '/images/placeholder.svg'
                            : movie[column.key]
                        }
                        alt={movie.Title}
                        className="w-full aspect-[0.6] object-cover mx-auto !max-w-14"
                        loading="eager"
                        fetchPriority="high"
                      />
                    ) : (
                      <span className="block line-clamp-2">{movie[column.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center py-4">
                No movies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
