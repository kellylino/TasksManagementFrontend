import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';

const About = () => {
  return (
    <div>
      <Box sx={{ margin: '15px' }}>
        <Typography variant="h4" gutterBottom>
          Author: Haiyuan Lin
        </Typography>
        <Typography variant="h6" gutterBottom>
          Application introduction:
        </Typography>
        <Typography variant="body1" gutterBottom>
        This is a task management application in which you can add a new task in 'Create Task' 
        and add new tags or delete tag lists in 'Manage Tags'. All the added tasks can be found 
        in 'All Tasks', and if you want to find tasks with specific tags, you can go to 'Filtering 
        By Tags'. Tasks order can be drag to change. The total usage time for each task in a selected 
        time period can be found in 'Task Summary'. If you want to check and manage the tasks' activity 
        in a selected time period, go to 'Task Activity'. Task daily activity charts can be generated in 
        'Daily Activity Chart'.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <LightModeIcon /> is light theme,
          <ModeNightIcon /> is dark theme, click the icon can swith between light theme and dark theme.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Filter1Icon /> is single task mode which mean that only one task can be active in the same time,
          <Filter9PlusIcon /> is default task mode which mean that multiple task can be active in the same 
          time click the icon can swith between single mode and default mode.
        </Typography>
        <Typography variant="body1" gutterBottom>
        All the functionality can be used with a keyboard only.
        </Typography>
        <Typography variant="body1" gutterBottom>
        Time usage: 120 Hours
        </Typography>
        <Typography variant="body1" gutterBottom>
        The two most difficult functions for me to implement are configuration, which can be used to 
        switch themes and modes, and accessibility, which allows for the use of all application functions 
        with only a keyboard.
        </Typography>
        <Typography variant="overline" display="block" color='red' gutterBottom>
          All the graphs in this website were created by the anthor.
        </Typography>
      </Box>
    </div>
  )
}

export default About