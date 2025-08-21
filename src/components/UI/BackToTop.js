import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import { Button } from '@mui/material';

const BackToTop = () => {
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      window.addEventListener("scroll", () => {
         if (window.pageYOffset > 100) {
            setVisible(true);
         } else {
            setVisible(false);
         }
      });
   }, []);

   const handleClick = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   };

   return (
      <Zoom in={visible}>
         <Box
            onClick={handleClick}
            sx={theme => ({
               position: 'fixed',
               bottom: '30px',
               right: '30px',
               zIndex: 999,
               [theme.breakpoints.down('md')]: {
                  bottom: '25px',
                  right: '25px'
               }
            })}
         >
            <Button
               variant='contained'
               sx={{
                  minWidth: 0,
                  minHeght: 0,
                  padding: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  transition: '300ms ease',
                  '&:hover': {
                     backgroundColor: 'primary.main'
                  }
               }}
            >
               <KeyboardArrowUpIcon sx={{ fontSize: '2rem' }} />
            </Button>
         </Box>
      </Zoom>
   );
}

export default BackToTop;