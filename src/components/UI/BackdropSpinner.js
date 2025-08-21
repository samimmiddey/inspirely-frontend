import React from 'react';
import { Backdrop } from '@mui/material';
import { Circles } from 'react-loader-spinner';

const BackdropSpinner = ({ value }) => {
   return (
      <Backdrop
         sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1
         }}
         open={value}
      >
         <Circles
            height='50'
            width='50'
            color='#fff'
            ariaLabel="circles-loading"
            visible={true}
         />
      </Backdrop>
   );
};

export default BackdropSpinner;