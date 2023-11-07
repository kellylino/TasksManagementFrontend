import dayjs from 'dayjs'
import TaskActivitySelector from './TaskActivitySelector'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import '../App.css'
import DailyActivityChart from './DailyActivityChart'
import DateRangePicker from './DateRangePicker'

// DailyActivity component for displaying daily activity chart
const DailyActivity = () => {
  const [startTime, setStartTime] = useState(dayjs().startOf('date'))
  const [endTime, setEndTime] = useState(dayjs().endOf('date'))
  const [taskName, setTaskName] = useState('')
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)

  const tasks = useSelector(state => state.tasks)

  const getCurrentTimestamp = (datetime) => {
    const date = new Date(datetime)
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is 0-based, so add 1
    const day = ('0' + date.getDate()).slice(-2);

    const currentTimestamp = `${year}-${month}-${day}`;
    return currentTimestamp;
  }

  const handleConfirmed = () => {
    if (taskName === "") {
      window.alert(`A valid task name is required`)
      return
    }

    setX([])
    setY([])

    const newTask = tasks.find(task => task.name === taskName)

    // Iterate through daily interval
    for (let currentDate = startTime; currentDate.isBefore(endTime); currentDate = currentDate.add(1, 'day')) {
      const dailyTotal = newTask.activities.reduce((acc, activity) => {
        if (getCurrentTimestamp(activity.start_time) === currentDate.format('YYYY-MM-DD') 
        || getCurrentTimestamp(activity.end_time) === currentDate.format('YYYY-MM-DD')) {
          const ST = new Date(currentDate) > new Date(activity.start_time)
            ? new Date(currentDate)
            : new Date(activity.start_time);

          const ET = new Date(endTime) < new Date(activity.end_time)
            ? new Date(endTime)
            : new Date(activity.end_time);

          return acc + (ET - ST);
        }

        return acc;
      }, 0) /1000/60;

      if (dailyTotal > 0) {
        setX((prevX) => [...prevX, currentDate.format('MM/DD/YYYY')]);
        setY((prevY) => [...prevY, dailyTotal])
      }
    }
  }

  return (
    <div>
      <div className='task-activity'>
        <TaskActivitySelector taskName={taskName} setTaskName={setTaskName} />
        <DateRangePicker
          handleConfirmed={handleConfirmed}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      </div>
      <div>
        {x && <DailyActivityChart x={x} y={y} />}
      </div>
    </div>
  )
}

export default DailyActivity