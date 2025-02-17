import { ofetch } from 'ofetch'

import type { MovieDetails, MovieSearchResponse } from '../types'

const apiClient = ofetch.create({
  baseURL: 'https://www.omdbapi.com',
  query: { apikey: import.meta.env.VITE_OMDB_API_KEY },
  // Tanstack Query already has a retry mechanism
  retry: false,
  onRequestError({ request, error }) {
    // Log error
    console.error('[request error]', request, error)
  },
  onResponseError({ request, response }) {
    // Log error
    console.error('[response error]', request, response.status, response.body)
  }
})

export function getMovies(params: { search: string; year?: string; type?: string; page?: number }) {
  return apiClient<MovieSearchResponse>('', {
    query: {
      s: params.search,
      page: params.page ?? 1,
      ...(!!params.year && { y: params.year }),
      ...(!!params.type && { type: params.type })
    }
  })
}

export function getMovieById(id: string) {
  return apiClient<MovieDetails>('', { query: { i: id, plot: 'full' } })
}
