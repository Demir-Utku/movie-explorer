import type { MovieSearchResult } from '../../types'

export const columns: { key: keyof MovieSearchResult; label: string }[] = [
  {
    key: 'Poster',
    label: 'Poster'
  },
  {
    key: 'Title',
    label: 'Title'
  },
  {
    key: 'Year',
    label: 'Year'
  },
  {
    key: 'Type',
    label: 'Type'
  },
  {
    key: 'imdbID',
    label: 'IMDb ID'
  }
]
