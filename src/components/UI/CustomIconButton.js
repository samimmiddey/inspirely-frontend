import React from 'react';
import { IconButton } from '@mui/material';

const CustomIconButton = ({ children, background, dimension, component }) => {
   return (
      <IconButton
         component={component || ''}
         sx={theme => ({
            width: dimension ? dimension : 45,
            height: dimension ? dimension : 45,
            padding: 0,
            backgroundColor: background ? background : '',
            '&:hover': {
               backgroundColor: background ? background : ''
            },
            [theme.breakpoints.down('sm')]: {
               width: dimension ? dimension : 38,
               height: dimension ? dimension : 38
            }
         })}
      >
         {children}
      </IconButton>
   );
};

export default CustomIconButton;