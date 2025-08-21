import React from 'react';
import { Card, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const CustomErrorCard = ({ errorText }) => {
   const { darkMode } = useSelector(uiValues);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Card
         elevation={0}
         sx={theme => ({
            display: errorText ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
            maxWidth: '400px',
            width: '100%',
            zIndex: 99999999,
            padding: '2.75rem 2rem 2.45rem 2rem',
            [theme.breakpoints.down('sm')]: {
               padding: '2rem 1.5rem'
            },
            [theme.breakpoints.down('xs')]: {
               maxWidth: '90%'
            }
         })}
      >
         <Image
            src={darkMode ? '/errorDark.png' : '/error.png'}
            alt='error logo'
            height={smWidth ? 75 : 96}
            width={smWidth ? 75 : 96}
         />
         <Typography
            sx={{
               fontSize: '2rem',
               fontWeight: 700,
               color: 'text.primary'
            }}
         >
            Oops!
         </Typography>
         <Typography
            sx={{
               fontSize: '1rem',
               fontWeight: 600,
               color: 'text.disabled'
            }}
         >
            Something went wrong!
         </Typography>
         <Typography
            sx={{
               fontWeight: 500,
               color: 'text.secondary',
               margin: '8px 0 20px 0',
               textAlign: 'center'
            }}
         >
            {errorText}
         </Typography>
      </Card>
   );
};

export default CustomErrorCard;