import { createSlice } from '@reduxjs/toolkit'
interface utilState {
  isHome: boolean
}

const initialState = {
  isHome: true
} as utilState

const utilSlice = createSlice({
  name: 'rentSlice',
  initialState,
  reducers: {
    atHome(state) {
      state.isHome = true
    },
    notHome(state) {
      state.isHome = false
    }
  }
})

export const { atHome, notHome } = utilSlice.actions
export default utilSlice.reducer
