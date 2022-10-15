import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import supReducer from './slices/supSlice'

const rootReducers = combineReducers({ user: userReducer, sup: supReducer })

export default rootReducers
