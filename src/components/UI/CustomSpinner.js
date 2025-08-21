import React from 'react';
import { Box } from '@mui/material';
import { Circles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const CustomSpinner = () => {
   const { darkMode } = useSelector(uiValues);

   return (
      <Box
         sx={{
            height: '100%',
            width: '100%',
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

export default CustomSpinner;