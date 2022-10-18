import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import supReducer from './slices/supSlice'
import rentSlice from './slices/rentSlice'

const rootReducers = combineReducers({
  user: userReducer,
  sup: supReducer,
  rent: rentSlice
})

export default rootReducers
