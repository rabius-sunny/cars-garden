import { createSlice } from '@reduxjs/toolkit'
interface userState {
  supBrand: null
}

const initialState = {
  supBrand: null
} as userState

const supSlice = createSlice({
  name: 'supSlice',
  initialState,
  reducers: {
    addBrand(state, action) {
      state.supBrand = action.payload
    },
    removeBrand(state) {
      state.supBrand = null
    }
  }
})

export const { addBrand, removeBrand } = supSlice.actions
export default supSlice.reducer
