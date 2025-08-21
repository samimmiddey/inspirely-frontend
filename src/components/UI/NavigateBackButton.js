import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MdArrowBack } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const NavigateBackButton = () => {
   const { darkMode } = useSelector(uiValues);

   return (
      <Tooltip title='Back' arrow>
         <IconButton
            sx={theme => ({
               width: 45,
               height: 45,
               padding: 0,
               backgroundColor: darkMode ? '#2c303a' : '#F8F9F9',
               '&:hover': {
                  backgroundColor: darkMode ? '#2c303a' : '#F8F9F9'
               },
               [theme.breakpoints.down('sm')]: {
                  width: 38,
                  height: 38
               }
            })}
         >
            <MdArrowBack style={{ fontSize: '1.5rem' }} />
         </IconButton>
      </Tooltip >
   );
};

export default NavigateBackButton;