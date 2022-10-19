import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import supReducer from './slices/supSlice'
import rentSlice from './slices/rentSlice'
import utilSlice from './slices/utilSlice'

const rootReducers = combineReducers({
  user: userReducer,
  sup: supReducer,
  rent: rentSlice,
  utils: utilSlice
})

export default rootReducers
