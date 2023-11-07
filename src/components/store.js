import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from '../reducers/tagsReducer.js'
import tasksReducer from '../reducers/tasksReducer.js'
import themeReducer from '../reducers/themeReducer.js'
import modeReducer from '../reducers/modeReducer.js'

const store = configureStore({
  reducer: {
    tags: tagsReducer,
    tasks: tasksReducer,
    theme: themeReducer,
    mode: modeReducer
  }
})

export default store