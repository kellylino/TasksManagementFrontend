import dayjs from 'dayjs'
import { useState } from 'react'
import TimePicker from './TimePicker'
import { useSelector } from 'react-redux'
import TaskTable from './TaskTable'

//Display the total active time for each task under the interval
const TaskSummary = () => {
  const [startTime, setStartTime] = useState(dayjs().startOf('date'))
  const [endTime, setEndTime] = useState(dayjs())
  const [taskSummary, setTaskSummary] = useState([])

  const columns = [
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'total_time', label: 'Total Time (S)', minWidth: 100 }
  ]
  const tasks = useSelector(state => state.tasks)

  const handleConfirmed = () => {
    const newTasks = tasks
      .filter(task => {
        const activities = task.activities
          //filter out those tasks which activities are not within the selcted interval and there is activity existence in the interval
          .filter(activity =>
            new Date(activity.end_time) > new Date(startTime) &&
            new Date(activity.start_time) < new Date(endTime))

        return activities.length > 0
      })
      .map(task => ({
        name: task.name,
        total_time: Math.floor(
          task.activities
            .filter(activity =>
              //filter out the activities which activities' time isn't in the interval.
              new Date(activity.end_time) > new Date(startTime) &&
              new Date(activity.start_time) < new Date(endTime))
            .reduce((acc, activity) => {
              //if activity start time is earlier then the selected start time then use selected start time as activity's start time
              const ST = new Date(startTime) > new Date(activity.start_time)
                ? new Date(startTime)
                : new Date(activity.start_time)

              //if activity end time is later then the selected end time then use selected end time as activity's end time  
              const ET = new Date(endTime) < new Date(activity.end_time)
                ? new Date(endTime)
                : new Date(activity.end_time)

              return acc + (ET - ST)
            }, 0) / 1000
        )
      }))
    setTaskSummary(newTasks)
  }

  return (
    <div>
      <TimePicker
        handleConfirmed={handleConfirmed}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <TaskTable columns={columns} rows={taskSummary} />
    </div>
  )
}

export default TaskSummary