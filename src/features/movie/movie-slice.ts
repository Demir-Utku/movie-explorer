import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { MovieType } from './types'

interface MovieState {
  search: string
  year: string
  type?: MovieType
  page?: number
}

const initialState: MovieState = {
  search: 'Pokemon',
  year: '',
  page: 1
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    // page should set to 1 when filters change
    setFilters: (state, action: PayloadAction<Partial<MovieState>>) => {
      return { ...state, ...action.payload, page: 1 }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  }
})

export const { setFilters, setPage } = movieSlice.actions
export default movieSlice.reducer
