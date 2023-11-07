import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Setting } from '../App';
import { useDispatch } from 'react-redux';
import { switchTheme } from '../reducers/themeReducer';

export default function ToggleTheme() {
  const { toggleColorTheme, themeMode } = React.useContext(Setting);

  const dispatch = useDispatch();

  const toggleMode = () => {
    toggleColorTheme()

   const newTheme = themeMode=== 'dark' ? "light" : "dark"

    dispatch(switchTheme(0, { name: newTheme }))
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleMode();
    }
  };

  return (
    <div onClick={toggleMode} onKeyDown={handleKeyDown} tabIndex="0" style={{ margin: '5px' }}>
      {themeMode=== 'dark' ? <ModeNightIcon /> : <LightModeIcon />}
    </div>
  );
}
