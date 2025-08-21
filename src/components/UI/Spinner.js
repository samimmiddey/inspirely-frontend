import React from 'react';
import { Box } from '@mui/material';
import { Circles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const Spinner = () => {
   const { darkMode } = useSelector(uiValues);

   return (
      <Box
         sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: darkMode ? '#21242c' : '#F2F3F4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
         }}
      >
         <Circles
            height='50'
            width='50'
            color={darkMode ? '#d3223d' : '#e60023'}
            ariaLabel="circles-loading"
            visible={true}
         />
      </Box>
   );
};

export default Spinner;