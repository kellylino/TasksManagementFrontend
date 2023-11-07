import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import '../App.css'

const DateRangePicker = (props) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="flex-container" style={{ margin: '7px' }}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="Start Time"
            value={props.startTime}
            onChange={(newValue) => props.setStartTime(newValue)}
          />
        </DemoContainer>
        <Box sx={{ mx: 2 }}> - </Box>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="End Time"
            value={props.endTime}
            onChange={(newValue) => props.setEndTime(newValue)}
          />
        </DemoContainer>
        <Button
          style={{ margin: '10px' }}
          onClick={() => props.handleConfirmed()}
          variant="contained"
          endIcon={<SendIcon />}>
          Confirm
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default DateRangePicker
