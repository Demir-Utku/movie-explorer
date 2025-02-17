export type MovieType = 'movie' | 'series' | 'episode'

export interface MovieSearchResult {
  Title: string
  Year: string
  Type: string
  Poster: string
  imdbID: string
}

export interface MovieSearchResponse {
  Search: MovieSearchResult[]
  totalResults: string
}

export interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Poster: string
  imdbRating: string
  imdbID: string
  Response: string
}
