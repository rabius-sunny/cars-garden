import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import requests from 'services/http'
interface userState {
  supplierToken: string
  userToken: string
  authLoading: 'pending' | 'error' | 'idle'
  name: string
}

const initialState = {
  supplierToken: '',
  userToken: '',
  authLoading: 'idle',
  name: ''
} as userState

export const signupSupplier = createAsyncThunk(
  'supplier/signup',
  async (body: object) => {
    const response = await requests.post('/signup-supplier', body)
    return { token: response.token, name: response.name }
  }
)
export const signinSupplier = createAsyncThunk(
  'supplier/signin',
  async (body: object) => {
    const response = await requests.post('/login-supplier', body)
    return { token: response.token, name: response.name }
  }
)
export const signinUser = createAsyncThunk(
  'user/signin',
  async (body: object) => {
    const response = await requests.post('/login-user', body)
    return { token: response.token, name: response.name }
  }
)
export const signupUser = createAsyncThunk(
  'user/signup',
  async (body: object) => {
    const response = await requests.post('/signup-user', body)
    return { token: response.token, name: response.name }
  }
)

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout(state) {
      state.name = ''
      state.supplierToken = ''
      state.userToken = ''
      window.location.reload()
    },
    resetAuthLoading(state) {
      state.authLoading = 'idle'
    }
  },
  extraReducers(builder) {
    // Supplier Sign up
    builder.addCase(signupSupplier.fulfilled, (state, action) => {
      state.supplierToken = action.payload.token
      state.name = action.payload.name
      state.authLoading = 'idle'
    }),
      builder.addCase(signupSupplier.pending, state => {
        state.authLoading = 'pending'
      }),
      builder.addCase(signupSupplier.rejected, state => {
        state.authLoading = 'error'
      }),
      // Supplier Sign in
      builder.addCase(signinSupplier.fulfilled, (state, action) => {
        state.supplierToken = action.payload.token
        state.name = action.payload.name
        state.authLoading = 'idle'
      }),
      builder.addCase(signinSupplier.pending, state => {
        state.authLoading = 'pending'
      }),
      builder.addCase(signinSupplier.rejected, state => {
        state.authLoading = 'error'
      }),
      // User Sign in
      builder.addCase(signinUser.fulfilled, (state, action) => {
        state.userToken = action.payload.token
        state.name = action.payload.name
        state.authLoading = 'idle'
      }),
      builder.addCase(signinUser.pending, state => {
        state.authLoading = 'pending'
      }),
      builder.addCase(signinUser.rejected, state => {
        state.authLoading = 'error'
      }),
      // User Sign up
      builder.addCase(signupUser.fulfilled, (state, action) => {
        state.userToken = action.payload.token
        state.name = action.payload.name
        state.authLoading = 'idle'
      }),
      builder.addCase(signupUser.pending, state => {
        state.authLoading = 'pending'
      }),
      builder.addCase(signupUser.rejected, state => {
        state.authLoading = 'error'
      })
  }
})

export const { logout, resetAuthLoading } = userSlice.actions
export default userSlice.reducer
