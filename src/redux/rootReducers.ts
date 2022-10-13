import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const rootReducers = combineReducers({ userReducer })

export default rootReducers
