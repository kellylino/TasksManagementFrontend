import { useState } from 'react';
import { useSelector } from 'react-redux';
import TasksList from './TasksList';
import TagsList from './TagsList';

//Allow user to filter tasks by tags
const FilterTasks = () => {
  //Get all tasks from the Redux store
  const allTasks = useSelector(state => state.tasks);
  //Initialize tags list state
  const [tagsList, setTagsList] = useState([])

  //Fliter tasks based on selected tags
  const tasks = tagsList.length > 0
    ? allTasks.filter(task => {
      return tagsList.every(selectedTag => task.tags.includes(selectedTag));
    })
    : [];// If no tags are selected, show nothing

  return (
    <div>
      <TagsList tagsList={tagsList} setTagsList={setTagsList}/>
      <TasksList tasks={tasks} />
    </div>
  )
}

export default FilterTasks