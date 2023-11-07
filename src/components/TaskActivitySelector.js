import { useSelector } from 'react-redux'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const TaskActivitySelector = (props) => {
  const tasks = useSelector(state => state.tasks)

  return (
    <div style={{ marginTop: '7px'}}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Task</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.taskName}
          onChange={(event) => props.setTaskName(event.target.value)}
          autoWidth
          label="Task"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {tasks.map((task, index) => (
            <MenuItem key={index} value={task.name}>
              {task.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default TaskActivitySelector