import '../App.css'
import Task from './Task'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateTaskOrderInStore } from '../reducers/tasksReducer';
import { useDispatch } from 'react-redux'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

//display all the tasks and tasks are drppable
const TasksList = ({ tasks }) => {
  const dispatch = useDispatch()

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(updateTaskOrderInStore(items));
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="task">
        {(provided) => (
          <List style={{ margin: "10px" }} {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => {
              return (
                <Draggable key={`task-${task.id.toString()}`} draggableId={`task-${task.id.toString()}`} index={index}>
                  {(provided) => (
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: "100%",
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: "auto",
                        margin: "10px"
                      }}
                    >
                      <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Task task={task} />
                      </ListItem>
                    </Box>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TasksList;
