import { createSlice } from '@reduxjs/toolkit'
interface userState {
  supBrand: string | null
  carImage: string | null
  imageStatus: 'idle' | 'pending'
}

const initialState = {
  supBrand: null,
  carImage: null,
  imageStatus: 'idle'
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
    },
    addCarImage(state, action) {
      state.carImage = action.payload
    },
    removeCarImage(state) {
      state.carImage = null
    },
    makeIdle(state) {
      state.imageStatus = 'idle'
    },
    makePending(state) {
      state.imageStatus = 'pending'
    }
  }
})

export const {
  addBrand,
  removeBrand,
  makeIdle,
  makePending,
  addCarImage,
  removeCarImage
} = supSlice.actions
export default supSlice.reducer
