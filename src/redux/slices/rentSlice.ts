import { createSlice } from '@reduxjs/toolkit'
interface rentState {
  location: string | null
  days: number | null
  picuptime: string | null
  dropofftime: string | null
  fromdate: Date | null
  todate: Date | null
  cover: Boolean
}

const initialState = {
  location: null,
  fromdate: null,
  todate: null,
  days: null,
  picuptime: null,
  dropofftime: null,
  cover: false
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
    },
    addCover(state) {
      state.cover = true
    },
    removeCover(state) {
      state.cover = false
    }
  }
})

export const {
  addLocation,
  addDays,
  addPickup,
  addDropoff,
  addFromDate,
  addTodate,
  addCover,
  removeCover
} = rentSlice.actions
export default rentSlice.reducer
