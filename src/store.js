import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pastekSlice'
export const store = configureStore({
  reducer:{
    paste: pasteReducer
  }
})