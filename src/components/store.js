import { configureStore } from '@reduxjs/toolkit'
import reportReducer from '../commonFilesreportSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reports: reportReducer,
  },
})
