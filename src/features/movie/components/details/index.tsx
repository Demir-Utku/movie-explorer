import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { MovieDetails as TMovieDetails } from '../../types'

export function MovieDetails({ movie }: { movie: TMovieDetails }) {
  return (
    <div className="p-2 lg:p-3 xl:p-4">
      <div className="mb-8">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft /> Back to Search
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[24rem_minmax(0,1fr)] gap-y-6 sm:gap-8 lg:gap-10">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-auto rounded-lg shadow !max-w-96 mx-auto"
          loading="eager"
          fetchPriority="high"
        />

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-3">{movie.Title}</h1>
            <p className="text-neutral-700 leading-relaxed">{movie.Plot}</p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4">
            <div>
              <dt className="text-sm text-neutral-600">Released</dt>
              <dd className="font-medium">{movie.Released}</dd>
            </div>

            <div>
              <dt className="text-sm text-neutral-600">Runtime</dt>
              <dd className="font-medium">{movie.Runtime}</dd>
            </div>

            <div>
              <dt className="text-sm text-neutral-600">Genre</dt>
              <dd className="font-medium">{movie.Genre}</dd>
            </div>

            <div>
              <dt className="text-sm text-neutral-600">Rating</dt>
              <dd className="font-medium">{movie.Rated}</dd>
            </div>

            <div>
              <dt className="text-sm text-neutral-600">Director</dt>
              <dd className="font-medium">{movie.Director}</dd>
            </div>

            <div>
              <dt className="text-sm text-neutral-600">Writer</dt>
              <dd className="font-medium">{movie.Writer}</dd>
            </div>

            <div>
              <dt className="text-sm text-neutral-600">Cast</dt>
              <dd className="font-medium">{movie.Actors}</dd>
            </div>

            <div>
              <dt className="text-sm text-neutral-600">IMDb Rating</dt>
              <dd className="font-medium">{movie.imdbRating}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
