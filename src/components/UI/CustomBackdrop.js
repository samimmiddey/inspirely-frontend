import React from 'react';
import { uiValues } from '../../Redux/slices/uiSlice';
import { useSelector } from 'react-redux';
import { Backdrop } from '@mui/material';

const CustomBackdrop = () => {
   const { inputFocus } = useSelector(uiValues);

   return (
      <Backdrop
         open={inputFocus}
         sx={{
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.5)'
         }}
      />
   );
};

export default CustomBackdrop;