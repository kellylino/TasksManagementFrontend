import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../reducers/tagsReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { deleteTag } from '../reducers/tagsReducer'
import { updateTask } from '../reducers/tasksReducer'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

// Component for adding and managing tags
const AddTags = () => {
  const dispatch = useDispatch()
  const [tag, setTag] = useState('')
  const tags = useSelector(state => state.tags)
  const tasks = useSelector(state => state.tasks)

  // Handle the addition of a new tag
  const handleNewTag = async (event) => {
    event.preventDefault()
    const newTag = { name: tag }

    try {
      if (tag === '') {
        window.alert('Tag name cannot be empty!!!')
      } else {
        // Check if the tag already exists; otherwise, add it to the database
        if (!tags.some(existingTag => existingTag.name === newTag.name)) {
          dispatch(addTag(newTag))
        } else {
          window.alert('Tag already existes')
        }
      }
      setTag('')
      //addTagRef.current.togglaVisibility() //execute the cancle button outside of toggable component
    } catch (exception) {
      console.error(exception);
    }
  }

  const handleTagDelete = async (tag) => {
    let affect = false
    // Check if deleting the tag would affect any tasks
    tasks.forEach((task) => {
      if (task.tags.includes(tag.name) && task.tags.length === 1) {
        affect = true
        window.alert('Delete this tag willl affect some tasks, since each task should have at least one tag!!!')
      }
    })

    if (!affect) {
      if (window.confirm(`Do you want to remove tag: "${tag.name}" from tags list?`)) {
        dispatch(deleteTag(tag.id))
        tasks.forEach((task) => {
          const updatedTask = { ...task, tags: task.tags.filter(t => t !== tag.name) }
          dispatch(updateTask(task.id, updatedTask))
        })
      }
    }
  }

  return (
    <div>
      <Box
        sx={{
          border: 1,
          borderColor: 'primary.main',
          margin: '5px',
          borderRadius: '5px'
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{ margin: '5px'}}>
            Tag List:
          </Typography>
          <List >
            {tags.map((tag) => (
              <div key={tag.id}>
                <ListItemButton >
                  <ListItemText primary={tag.name} />
                  <IconButton edge="end" color="error" aria-label="delete" onClick={() => handleTagDelete(tag)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
              </div>
            ))}
          </List>
        </Grid>
      </Box>
      <Form onSubmit={handleNewTag} className='border'>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tag: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tag Name"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </Form.Group>
        <Button variant="outline-success" id="create-button" type="submit">
          Add
        </Button>
      </Form>
    </div>
  )
}

export default AddTags