import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ToggleTheme from './ToggleTheme'
import ToggleMode from './ToggleMode'
import React from 'react'
import '../App.css'
import { Setting } from '../App';

const NavigationBar = () => {
  const { themeMode } = React.useContext(Setting);
  const dropdownStyle = themeMode === 'dark' ? 'custom-nav-dropdown-dark' : 'custom-nav-dropdown-light';

  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey="/">
        <Nav.Item >
          <Nav.Link href="/" eventKey="link-2" bsPrefix={dropdownStyle}>About</Nav.Link>
        </Nav.Item>
        <NavDropdown title="Create" bsPrefix={dropdownStyle}>
          <NavDropdown.Item  href="/createTasks">Create Task</NavDropdown.Item>
          <NavDropdown.Item href="/createTags">Manage Tags</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Filter" bsPrefix={dropdownStyle}>
          <NavDropdown.Item href="/tasks">All Tasks</NavDropdown.Item>
          <NavDropdown.Item href="/filterTasks">Filtering By Tags</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Interval" bsPrefix={dropdownStyle}>
          <NavDropdown.Item href="/timerPicker">Task Summary</NavDropdown.Item>
          <NavDropdown.Item href="/TaskActivity">Task Activity</NavDropdown.Item>
          <NavDropdown.Item href="/DailyActivity">Daily Activity Chart</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item title="Theme">
        <ToggleTheme/>
        </Nav.Item>
        <Nav.Item title="Mode">
        <ToggleMode />
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default NavigationBar

