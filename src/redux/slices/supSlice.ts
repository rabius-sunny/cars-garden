import { createSlice } from '@reduxjs/toolkit'
interface userState {}

const initialState = {} as userState

const supSlice = createSlice({
  name: 'supSlice',
  initialState,
  reducers: {}
})

export const {} = supSlice.actions
export default supSlice.reducer
