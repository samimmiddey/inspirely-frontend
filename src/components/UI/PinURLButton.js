import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const PinURLButton = ({ url, maxWidth, padding, iconSize, textSize }) => {
   const { selected, selectedShareButton } = useSelector(uiValues);

   const customizedURL = url.replace(/^https?:\/\//, '');

   const finalURL = customizedURL.substring(customizedURL.indexOf('.') + 1);

   const theme = useTheme();
   const xsWidth = useMediaQuery(theme.breakpoints.down('xs'));

   return (
      <a
         className={selected || selectedShareButton ? 'text-wrap' : 'destination-button text-wrap'}
         href={url}
         target='_blank'
         rel='noreferrer'
         onClick={e => e.stopPropagation()}
         style={{
            display: xsWidth ? 'none' : 'flex',
            alignItems: 'center',
            maxWidth: maxWidth,
            padding: padding,
            backgroundColor: '#F2F3F4',
            borderRadius: '50px',
            columnGap: '2px',
            opacity: 0.9,
            height: '32px',
            '&:hover': {
               opacity: 0.8
            }
         }}
      >
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowOutwardIcon sx={{ fontSize: iconSize, color: '#302f37' }} />
         </Box>
         <Typography
            className='text-wrap'
            sx={{
               fontSize: textSize,
               fontWeight: 600,
               color: '#302f37'
            }}
         >
            {finalURL}
         </Typography>
      </a>
   );
};

export default PinURLButton;