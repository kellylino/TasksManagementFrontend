import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import '../App.css'

const TimePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="flex-container" style={{ margin: '7px'}}>
        <DemoContainer components={['DateTimePicker']} >
          <DateTimePicker
            style={{ color:'white' }}
            ampm={false}
            label="Start Time"
            value={props.startTime}
            onChange={(newValue) => props.setStartTime(newValue)}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
          />
        </DemoContainer>
        <Box sx={{ mx: 2 }}> - </Box>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            ampm={false}
            label="End Time"
            value={props.endTime}
            onChange={(newValue) => props.setEndTime(newValue)}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
          />
        </DemoContainer>
          <Button
            style={{ margin: '10px'}}
            onClick={() => props.handleConfirmed()}
            variant="contained"
            endIcon={<SendIcon />}>
            Confirm
          </Button>
      </Box>
    </LocalizationProvider>
  )
}

export default TimePicker