import { createSlice } from '@reduxjs/toolkit'
import tagsServices from '../services/tags'

const tagSlice = createSlice({
  name: 'tags',
  initialState: [],
  reducers: {
    initial(state, action){
      return action.payload
    },
    appendTag(state, action) {
      state.push(action.payload)
    },
    removeTag(state, action) {
      const id = action.payload
      const updatedTag =  state.filter(tag => tag.id !== id)
      return updatedTag
    }
  }
})

export const { initial, appendTag, removeTag } = tagSlice.actions

export const initializeTags = () => {
  return async dispatch => {
    const tags = await tagsServices.getAll()
    dispatch(initial(tags))
  }
}

export const addTag = (newTag) => {
  return async dispatch => {
    const tag = await tagsServices.create(newTag)
    dispatch(appendTag(tag))
  }
}

export const deleteTag = (id) => {
  return async dispatch => {
    await tagsServices.remove(id)
    dispatch(removeTag(id))
  }
}

export default tagSlice.reducer