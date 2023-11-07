import { createSlice } from '@reduxjs/toolkit'
import themeServices from '../services/theme'

const themeFromLocalStorage = localStorage.getItem('theme')

const themeSlice = createSlice({
  name: 'theme',
  initialState: themeFromLocalStorage || [],
  reducers: {
    initial(state, action) {
      return action.payload
    }
  }
})

export const { initial } = themeSlice.actions

export const initializeTheme = () => {
  return async dispatch => {
    const theme = await themeServices.getAll()
    dispatch(initial(theme))
    localStorage.setItem('theme', theme[0].name)
  }
}

export const switchTheme = (id, newTheme) => {
  return async dispatch => {
    const theme = await themeServices.update(id, newTheme)
    dispatch(initial(theme))
    localStorage.setItem('theme', theme.name)
  }
}

export default themeSlice.reducer