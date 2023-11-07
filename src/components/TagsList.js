import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from 'react-redux';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

export default function TagsList({ tagsList, setTagsList }) {
  const tags = useSelector(state => state.tags);

  const selectTag = (tag) => {
    if (!tagsList.includes(tag)) {
      setTagsList([...tagsList, tag]);
    } else {
      setTagsList(tagsList.filter(T => T !== tag))
    }
  }

  return (
    <div>
      <Box
        sx={{
          width: "auto",
          maxWidth: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
          margin: "5px"
        }}
      >
        <Typography variant="h5" gutterBottom>
          Selected Tags:
        </Typography>
        <Stack direction="row" spacing={2}>
          {tagsList.map(tag => (
            <Button variant="outlined" size="medium" key={tag}>{tag}</Button>
          ))}
        </Stack>
      </Box>
      <List
        sx={{
          width: "auto",
          maxWidth: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
          border: 1,
          borderColor: 'primary.main',
          margin: "5px"
        }}
      >
        {tags.map((tag) => {
          const labelId = `checkbox-list-secondary-label-${tag.id}`;
          return (
            <ListItem
              key={tag.name}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onClick={() => selectTag(tag.name)}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={tag.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
