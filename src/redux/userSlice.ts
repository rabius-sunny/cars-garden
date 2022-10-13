import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import requests from 'services/http'

interface userState {
  token: string
}

const initialState = { token: '' } as userState

export const signupUser = createAsyncThunk(
  'user/signup',
  async (body: object) => {
    const response = await requests.post('/signup-supplier', body)
    return response.token
  }
)

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout() {
      alert('Log out')
    }
  },
  extraReducers(builder) {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.token = action.payload
    })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
