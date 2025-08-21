import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, background, color, border, type, loading, height, borderRadius, variant, fontSize }) => {
   return (
      <Button
         disableElevation
         variant={variant ? variant : 'contained'}
         type={type}
         disabled={loading}
         sx={theme => ({
            minWidth: 0,
            minHeight: 0,
            padding: '0 20px',
            height: height ? height : '45px',
            textTransform: 'none',
            color: color,
            width: '100%',
            borderRadius: borderRadius ? borderRadius : '8px',
            border: border,
            backgroundColor: background,
            fontSize: fontSize ? fontSize : '14px',
            '&:hover': {
               backgroundColor: background
            },
            [theme.breakpoints.down('md')]: {
               height: height ? height : '42px'
            }
         })}
      >
         {children}
      </Button>
   );
};

export default CustomButton;