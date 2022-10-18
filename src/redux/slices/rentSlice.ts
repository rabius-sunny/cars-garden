import { createSlice } from '@reduxjs/toolkit'
interface rentState {
  location: string
  days: number | null
  picuptime: string | null
  dropofftime: string | null
}

const initialState = {
  location: '',
  days: null,
  picuptime: null,
  dropofftime: null
} as rentState

const rentSlice = createSlice({
  name: 'rentSlice',
  initialState,
  reducers: {
    addLocation(state, action) {
      state.location = action.payload
    },
    addDays(state, action) {
      state.days = action.payload
    },
    addPickup(state, action) {
      state.picuptime = action.payload
    },
    addDropoff(state, action) {
      state.dropofftime = action.payload
    }
  }
})

export const { addLocation, addDays, addPickup, addDropoff } = rentSlice.actions
export default rentSlice.reducer
