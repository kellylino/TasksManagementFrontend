import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import '../App.css'
import { useMediaQuery } from '@mui/material';

const DailyActivityChart = ({ x, y }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(min-width: 601px) and (max-width: 1024px)');

  // Determine the appropriate CSS class based on screen size
  const chartClass = isSmallScreen ? 'chart-small' : (isMediumScreen ? 'chart-medium' : 'chart-large');

  return (
   <div>
     <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: x,
          scaleType: 'band',
          label: 'Date',
          containerHeight: 400,
        },
      ]}
     series={[
        {
          data: y,
          label: 'Minutes (m)'
        }, 
      ]}
      className={chartClass}
      height={400}
    />
   </div>
  );
}

export default DailyActivityChart;