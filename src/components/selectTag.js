import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { updateTask } from '../reducers/tasksReducer';
import { useSelector, useDispatch } from 'react-redux';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

// SelectTag component allows users to select tags to a task or filter tasks by selected tags
const SelectTag = ({ task }) => {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags);

  const handleTagAdd = (tag) => {
    if (!task.tags.some(existingTag => existingTag === tag)) {
      const tagsList = [...task.tags, tag];
      console.log(tagsList);
      dispatch(updateTask(task.id, { ...task, tags: tagsList }))
    } else {
      window.alert('Tag already existes')
    }
  }

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          minWidth: 400,
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
          margin: "5px",
          border: 1,
          borderColor: 'primary.main' 
        }}
      >
        <Typography variant="h5"  style={{ margin:"15px" }} gutterBottom>
          Tags:
        </Typography>
        <Stack  direction={{ sm: 'column', md: 'row' }} >
          {tags.map((tag) => (
            <Button
              variant="outlined"
              key={tag.name}
              onClick={() => handleTagAdd(tag.name)}
              style={{ margin: "10px" }}
            >
              {tag.name}
            </Button>
          ))}
        </Stack>
      </Box>
    </div>
  );
  
}

export default SelectTag;
