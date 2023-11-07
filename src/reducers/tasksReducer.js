import { createSlice } from '@reduxjs/toolkit'
import tasksServices from '../services/tasks'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    initial(state, action){
      return action.payload
    },
    appendTask(state, action) {
      state.push(action.payload)
    },
    removeTask(state, action) {
      const id = action.payload
      return state.filter(task => task.id !== id)
    },
    updateTasks(state, action) {
      const id = action.payload.id
      const updatedTask = action.payload.task
      return state.map(task => task.id !== id ? task : updatedTask)
    },
    updateTaskOrder(state, action) {
      return action.payload;
    }
  }
})

export const { initial, appendTask, removeTask, updateTasks, updateTaskOrder } = taskSlice.actions

export const initializeTasks = () => {
  return async dispatch => {
    const tasks = await tasksServices.getAll()
    dispatch(initial(tasks))
  }
}

export const addTask = (newTag) => {
  return async dispatch => {
    const task = await tasksServices.create(newTag)
    dispatch(appendTask(task))
  }
}

export const deleteTask = (id) => {
  return async dispatch => {
    await tasksServices.remove(id)
    dispatch(removeTask(id))
  }
}

export const updateTask = (id, updatedtask) => {
  return async dispatch => {
    const task  = await tasksServices.update(id, updatedtask)
    console.log('reducer ', task)
    dispatch(updateTasks({id : id, task : task}))
  }
}

export const updateTaskOrderInStore = (newOrder) => {
  return async (dispatch) => {
    dispatch(updateTaskOrder(newOrder));
  }
}


export default taskSlice.reducer