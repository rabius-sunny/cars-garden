import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const rootReducers = combineReducers({ user: userReducer })

export default rootReducers
