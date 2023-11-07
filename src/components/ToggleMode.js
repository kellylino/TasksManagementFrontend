import * as React from 'react';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import { switchMode } from '../reducers/modeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../reducers/tasksReducer';
import { Setting } from '../App';

export default function ToggleMode() {
  const { toggleMode, mode } = React.useContext(Setting);
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);

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

  const handleMode = () => {
    toggleMode()
    const modeForStorage = mode === 'default' ? 'single' : 'default'

    //switch all the active task to inactive
    if(modeForStorage === 'single') {
      tasks.map(task => {
        const updatedTask = JSON.parse(JSON.stringify(task))
        if(updatedTask.status === 'active') {
          const newStatus = 'inactive'
          const index = updatedTask.activities.findIndex(
            (activity) => activity.end_time === null
          )

          if(index !== -1){
            updatedTask.activities[index].end_time = getCurrentTimestamp()
          }
          updatedTask.status = newStatus
          dispatch(updateTask(updatedTask.id, updatedTask))
          return updatedTask
        }
        return task
      });
    }

   dispatch(switchMode(0, { name: modeForStorage }))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleMode();
    }
  };

  return (
   <div onClick={handleMode} onKeyDown={handleKeyDown} tabIndex="0" style={{ margin:'5px' }}>
   {mode === 'single' ? <Filter1Icon /> : <Filter9PlusIcon />}
   </div>
  );
}
