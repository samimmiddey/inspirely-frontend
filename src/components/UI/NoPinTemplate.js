import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import CustomButton from './CustomButton';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const NoPinTemplate = ({ text }) => {
   const { darkMode } = useSelector(uiValues);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '1rem',
            marginTop: '5rem'
         }}
      >
         <Image
            src={darkMode ? '/uploadDark.png' : '/upload.png'}
            alt=''
            height={smWidth ? 225 : 250}
            width={300}
            objectFit='contain'
         />
         <Typography
            variant='h6'
            sx={theme => ({
               fontWeight: 600,
               color: 'text.primary',
               // marginTop: '1rem',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1rem'
               }
            })}
         >
            {text ? text : 'No pins to show!'}
         </Typography>
         {
            !text &&
            <Link href='/create-pin'>
               <Box>
                  <CustomButton
                     background={darkMode ? '#21242c' : '#F2F3F4'}
                     border='1px solid primary.main'
                     variant='outlined'
                     height='38px'
                  >
                     Upload
                  </CustomButton>
               </Box>
            </Link>
         }
      </Box>
   );
};

export default NoPinTemplate;