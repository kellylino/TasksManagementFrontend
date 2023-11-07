import { useState, useImperativeHandle, forwardRef } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hidewhenvisible = { display: visible ? 'none' : '' }
  const showwhenvisible = { display: visible ? '' : 'none' }

  const togglaVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      togglaVisibility
    }
  })

  return (
    <div>
      <div style={hidewhenvisible}>
        <Fab
          color="primary"
          aria-label="add"
          style={{
            margin: '5px'
          }}
          onClick={togglaVisibility}
        >
          <AddIcon />
        </Fab>
      </div>
      <div style={showwhenvisible}>
        {props.children}
        {props.buttonLabels && (
          <Button
            variant="outlined"
            color="error"
            onClick={togglaVisibility}>
            {props.buttonLabels[0]}
          </Button>
        )}
      </div>
    </div>
  )
})

export default Togglable
