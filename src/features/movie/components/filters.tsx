import { useEffect, startTransition, useState } from 'react'

import { useDebounce } from '@/hooks/use-debounce'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

import { setFilters } from '../movie-slice'
import { useAppDispatch, useAppSelector } from '../hooks/useStore'

export function MovieFilters() {
  const yearOptions = [
    { value: '', label: 'All Years' },
    ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => ({
      value: String(year),
      label: String(year)
    }))
  ]

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series' },
    { value: 'episode', label: 'Episodes' }
  ]

  const { year, type } = useAppSelector(state => state.movie)

  // Pokemon is the default search term
  const [searchValue, setSearchValue] = useState('Pokemon')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // startTransition is used so that UI can remain responsive if the filtering leads to bigger UI updates
    startTransition(() => {
      dispatch(
        setFilters({
          search: debouncedSearchValue,
          year,
          type
        })
      )
    })
  }, [debouncedSearchValue, year, type, dispatch])

  function handleTypeChange(value: string) {
    if (value === '') {
      dispatch(setFilters({ type: undefined }))
    } else {
      dispatch(setFilters({ type: value as 'movie' | 'series' | 'episode' }))
    }
  }

  function handleYearChange(value: string) {
    if (value === '') {
      dispatch(setFilters({ year: undefined }))
    } else {
      dispatch(setFilters({ year: value }))
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-x-4 gap-y-2">
      <Input
        placeholder="Search movies..."
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
        className="max-w-xs"
        data-testid="movie-search-input"
      />

      <Select
        value={year}
        options={yearOptions}
        placeholder="Release Year"
        onChange={handleYearChange}
      />

      <Select
        value={type ?? ''}
        options={typeOptions}
        placeholder="Type"
        onChange={handleTypeChange}
      />
    </div>
  )
}
