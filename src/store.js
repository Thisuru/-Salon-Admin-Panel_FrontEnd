import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: [thunk],
})