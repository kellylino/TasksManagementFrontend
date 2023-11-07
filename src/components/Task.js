import SelectTag from './selectTag';
import Togglable from './Togglable';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../reducers/tasksReducer';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import SaveIcon from '@mui/icons-material/Save';
import IOSSwitch from './IOSSwitch';
import { useSelector } from 'react-redux';
import { Setting } from '../App';
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';

const Task = ({ task }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const { mode } = React.useContext(Setting);

  const tasks = useSelector((state) => state.tasks);

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
    dispatch(updateTask(task.id, { ...task, name: editedName }))
  }

  const handleDeleteTag = (tag) => {
    if (task.tags.length < 2) {
      window.alert("Each task should have at least one tag")
    } else {
      const tagsList = task.tags.filter(T => T !== tag)
      dispatch(updateTask(task.id, { ...task, tags: tagsList }))
    }
  }

  const handleTaskDelete = () => {
    dispatch(deleteTask(task.id))
  }

  const getCurrentTimestamp = () => {
    const currentDate = new Date();

    // Get the individual components: year, month, day, hour, minute, and second
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month is 0-based, so add 1
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hour = ('0' + currentDate.getHours()).slice(-2);
    const minute = ('0' + currentDate.getMinutes()).slice(-2);
    const second = ('0' + currentDate.getSeconds()).slice(-2);

    const currentTimestamp = `${month}/${day}/${year}, ${hour}:${minute}:${second}`;
    return currentTimestamp;
  }

  const handleTaskStatus = () => {
    // Create a deep copy of the task object
    const updatedTask = JSON.parse(JSON.stringify(task))
    const newStatus = task.status === 'inactive' ? 'active' : 'inactive'
    const id = uuidv4()

    if (mode === 'single') {
      console.log('Task mode: ', mode)
      if (task.status === 'inactive') {
        //if current task is inactive, stop other task's activity
        tasks.map(task => {
          const updatedTask = JSON.parse(JSON.stringify(task))
          if (updatedTask.status === 'active') {
            const newStatus = 'inactive'
            const index = updatedTask.activities.findIndex(
              (activity) => activity.end_time === null
            )

            updatedTask.status = newStatus
            updatedTask.activities[index].end_time = getCurrentTimestamp()
            dispatch(updateTask(updatedTask.id, updatedTask))
            return updatedTask
          }
          return task
        });

        //start a new activity
        const id = uuidv4()

        updatedTask.activities.push({
          start_time: getCurrentTimestamp(),
          end_time: null,
          id: id,
        })
      } else {
        // if current task is active, stop current task
        const lastActivityIndex = updatedTask.activities.findIndex(
          (activity) => activity.end_time === null
        )
        if (lastActivityIndex !== -1) {
          updatedTask.activities[lastActivityIndex].end_time = getCurrentTimestamp();
        }
      }
    }

    if (mode === 'default') {
      const lastActivityIndex = updatedTask.activities.findIndex(
        (activity) => activity.end_time === null
      )

      if (newStatus === 'active' && lastActivityIndex === -1) {
        // If no active activity found, add a new activity
        updatedTask.activities.push({
          start_time: getCurrentTimestamp(),
          end_time: null,
          id: id,
        })
      } else if (newStatus === 'inactive' && lastActivityIndex !== -1) {
        // If there is an active activity, update its end_time
        updatedTask.activities[lastActivityIndex].end_time = getCurrentTimestamp()
      }
    }

    dispatch(updateTask(updatedTask.id, { ...updatedTask, status: newStatus }))
  }

  return (
    <div className="task">
      {isEditing ? (
        <div>
          <TextField
            label="Task name"
            id="outlined-size-normal"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <Box
            sx={{
              width: "100%",
              minWidth: 400,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 250,
              margin: "5px",
              border: 1,
              borderColor: 'primary.main'
            }}
          >
            <List>
              {task.tags.map((tag, index) => (
                <div key={index}>
                  <ListItemButton >
                    <ListItemText primary={tag} />
                    <IconButton edge="end" color="error" aria-label="delete" onClick={() => handleDeleteTag(tag)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemButton>
                </div>
              ))}
            </List>
          </Box>
          <Togglable buttonLabels={['Cancle']} >
            <SelectTag task={task} />
          </Togglable>
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            color="secondary"
            onClick={handleSaveClick}
            startIcon={<SaveIcon />}>
            Save
          </Button>
        </div>
      ) : (
        <>
          <List>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Task name: </Button>
              <Button variant="text">{task.name}</Button>
            </Stack>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} checked={task.status === 'active'} />}
              label={task.status}
              onChange={handleTaskStatus}
            />
            <Stack direction={{ xxs: 'column', md: 'row' }}>
              <Button variant="outlined">Tag: </Button>
              <Box
                sx={{
                  border: 1,
                  borderColor: 'primary.main'
                }}
              >
                {task.tags.map((tag, index) => (
                  <Button variant="text" key={index}>{tag}</Button>
                ))}
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} style={{ marginTop: "10px" }}>
              <Button size="small" variant="outlined" color="error" onClick={handleTaskDelete} startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <Fab size="small" color="secondary" aria-label="edit" onClick={handleEditClick}>
                <EditIcon />
              </Fab>
            </Stack>
          </List>
        </>
      )}
    </div>
  )
}

export default Task;
