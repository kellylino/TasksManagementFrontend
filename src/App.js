import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import About from './components/About';
import AddTask from './components/AddTask';
import TasksList from './components/TasksList';
import FilterTasks from './components/FilterTasks';
import AddTags from './components/AddTags';
import TaskSummary from './components/TaskSummary';
import TaskActivity from './components/TaskActivity';
import DailyActivity from './components/DailyActivity';
import { initializeTags } from './reducers/tagsReducer';
import { initializeTasks } from './reducers/tasksReducer';
import { initializeTheme } from './reducers/themeReducer';
import { initializeMode } from './reducers/modeReducer';
import { FocusTrap } from "@mui/base/FocusTrap";

// Create a context for settings
export const Setting = React.createContext();

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const [focusTrapOpen, setFocusTrapOpen] = React.useState(true);

  useEffect(() => {
    dispatch(initializeTags());
    dispatch(initializeTasks());
    dispatch(initializeTheme())
    dispatch(initializeMode())
  }, [dispatch]);

  const initialTheme = localStorage.getItem('theme') === null ? 'light' : localStorage.getItem('theme')

  const [themeMode, setThemeMode] = React.useState(initialTheme);
  
  // Toggle between light and dark theme
  const toggleColorTheme = () => {
    setThemeMode((prevThme) => (prevThme === 'light' ? 'dark' : 'light'))
  };

  const initialMode = localStorage.getItem('mode') === null ? 'default' : localStorage.getItem('mode')
  const [mode, setMode] = React.useState(initialMode)

  // Toggle between default and single task mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'default' ? 'single' : 'default'))
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <Setting.Provider value={{ toggleColorTheme, themeMode, toggleMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router tabIndex={0}>
        <FocusTrap open={focusTrapOpen} disableRestoreFocus disableAutoFocus>
          <div tabIndex={0}>

          <NavigationBar setFocusTrapOpen={setFocusTrapOpen} />

          <Link to={'/'} />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/createTasks"  element={<AddTask />} />
            <Route path="/createTags" element={<AddTags />} />
            <Route path="/tasks" element={<TasksList tasks={tasks} />} />
            <Route path="/filterTasks" element={<FilterTasks />} />
            <Route path="/timerPicker" element={<TaskSummary />} />
            <Route path="/TaskActivity" element={<TaskActivity />} />
            <Route path="/DailyActivity" element={<DailyActivity />} />
          </Routes>
          </div>
        </FocusTrap>

        </Router>

      </ThemeProvider>
    </Setting.Provider>
  );
}

export default App;
