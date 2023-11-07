import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TimePicker from './TimePicker'
import TaskActivitySelector from './TaskActivitySelector'
import '../App.css'
import EditingTable from './EditingTable'

const TaskActivity = () => {
  const [startTime, setStartTime] = useState(dayjs().startOf('date'))
  const [endTime, setEndTime] = useState(dayjs())
  const [taskName, setTaskName] = useState('')
  const [task, setTask] = useState(null)
  const [activities, setActivities] = useState([])

  const tasks = useSelector(state => state.tasks)

  useEffect(() => {
    if (taskName !== "" && tasks.length > 0) {
      handleConfirmed();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const handleConfirmed = () => {
    if(taskName === "") {
      window.alert(`A valid task name is required`)
      return
    }

    //find task based on task name
    const newTask = tasks.find(task => task.name === taskName)

    //filter out the activities which are whinth the selcted interval
    const newActivities = newTask.activities
      .filter(activity =>
        new Date(activity.end_time) > new Date(startTime) &&
        new Date(activity.start_time) < new Date(endTime))
      .map(activity => {
        const ST = new Date(startTime) > new Date(activity.start_time)
          ? new Date(startTime)
          : new Date(activity.start_time);

        const ET = new Date(endTime) < new Date(activity.end_time)
          ? new Date(endTime)
          : new Date(activity.end_time);

        return {
          ...activity,
          start_time: ST,
          end_time: ET
        }
      })

    setTask(newTask)
    setActivities(newActivities)
  }

  return (
    <div>
      <div>
        <TaskActivitySelector taskName={taskName} setTaskName={setTaskName} />
        <TimePicker
          handleConfirmed={handleConfirmed}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      </div>
      <div>
        {task && 
        <EditingTable 
        task={task} 
        activities={activities}
        startTime={startTime}
        endTime={endTime}
        />}
      </div>
    </div>
  )
}

export default TaskActivity