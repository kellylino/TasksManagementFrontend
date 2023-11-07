import { createSlice } from '@reduxjs/toolkit'
import modeServices from '../services/mode'

const modeFromLocalStorage = localStorage.getItem('mode')

const modeSlice = createSlice({
  name: 'mode',
  initialState: modeFromLocalStorage || [],
  reducers: {
    initial(state, action) {
      return action.payload
    }
  }
})

export const { initial } = modeSlice.actions

export const initializeMode = () => {
  return async dispatch => {
    const mode = await modeServices.getAll()
    localStorage.setItem('mode', mode[0].name)
    dispatch(initial(mode))
  }
}

export const switchMode = (id, newMode) => {
  return async dispatch => {
    const mode = await modeServices.update(id, newMode)
    localStorage.setItem('mode', mode.name)
    dispatch(initial(mode))
  }
}

export default modeSlice.reducer