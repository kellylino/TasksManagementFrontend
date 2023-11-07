import '../App.css'
import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import { addTask } from '../reducers/tasksReducer'
import { useDispatch, useSelector } from 'react-redux'
import TagsList from './TagsList';

// Component for adding a new task
const AddTask = () => {
  const dispatch = useDispatch()
  const [taskName, setTaskName] = useState('')
  const [tagsList, setTagsList] = useState([])

  // Get tasks from the Redux store
  const tasks = useSelector(state => state.tasks)

  // Handle the creation of a new task
  const handleNewTask = (event) => {
    event.preventDefault()

    const newTask = {
      name: taskName,
      tags: tagsList,
      status: "inactive",
      activities: []
    }

    try {
      if (taskName === '' || tagsList.length === 0) {
        window.alert('Task name or tag cannot be empty!!!');
      } else if (tasks.some(task => task.name === taskName)) {
        window.alert('Task already exists.')
      } else {
        dispatch(addTask(newTask))
        setTaskName('')
        setTagsList([])
      }
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <div>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={{ margin: "5px" }}>
        <Form.Label>Task:</Form.Label>
        <Form.Control
          tabIndex={0}
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          placeholder="Enter task's name"
        />
      </Form.Group>
      <TagsList tagsList={tagsList} setTagsList={setTagsList} />
      <Button
        tabIndex={0}
        style={{ margin: "10px" }}
        variant="contained"
        color="success"
        onClick={handleNewTask}
      >
        Save
      </Button>
    </div>
  )
}

export default AddTask