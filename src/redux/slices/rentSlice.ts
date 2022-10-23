import { createSlice } from '@reduxjs/toolkit'
interface rentState {
  location: string | null
  days: number | null
  picuptime: string | null
  dropofftime: string | null
  fromdate: Date | null
  todate: Date | null
}

const initialState = {
  location: null,
  fromdate: null,
  todate: null,
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
    },
    addFromDate(state, action) {
      state.fromdate = action.payload
    },
    addTodate(state, action) {
      state.todate = action.payload
    }
  }
})

export const {
  addLocation,
  addDays,
  addPickup,
  addDropoff,
  addFromDate,
  addTodate
} = rentSlice.actions
export default rentSlice.reducer
