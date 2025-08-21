import React from 'react';
import { Typography } from '@mui/material';

const CustomHeader = ({ text, margin }) => {
   return (
      <Typography
         className='text-wrap'
         sx={theme => ({
            color: 'text.primary',
            fontWeight: 600,
            fontSize: '1.75rem',
            margin: margin,
            maxWidth: '100%',
            [theme.breakpoints.down('md')]: {
               fontSize: '1.5rem'
            }
         })}
      >
         {text}
      </Typography>
   );
};

export default CustomHeader;