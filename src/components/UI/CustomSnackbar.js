import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Box, IconButton } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery } from '@mui/material';
import { setSnackbar, uiValues } from '../../Redux/slices/uiSlice';

const CustomSnackbar = () => {
   const { snackbar, showSnackbar, snackbarText, darkMode } = useSelector(uiValues);

   const dispatch = useDispatch();

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   const [snackPack, setSnackPack] = useState([]);
   const [messageInfo, setMessageInfo] = useState(undefined);

   useEffect(() => {
      if (showSnackbar) {
         setSnackPack((prev) => [...prev, { message: 'Message A', key: new Date().getTime() }]);
      }
   }, [snackbar, showSnackbar]);

   useEffect(() => {
      if (snackPack.length && !messageInfo) {
         // Set a new snack when we don't have an active one
         setMessageInfo({ ...snackPack[0] });
         setSnackPack((prev) => prev.slice(1));
         dispatch(setSnackbar({ value: true, text: snackbarText }));
      } else if (snackPack.length && messageInfo && showSnackbar) {
         // Close an active snack when a new one is added
         dispatch(setSnackbar({ value: false, text: snackbarText }));
      }
   }, [snackPack, messageInfo, showSnackbar, snackbarText, dispatch]);

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      dispatch(setSnackbar({ value: false, text: snackbarText }));
   };

   const handleExited = () => {
      setMessageInfo(undefined);
   };

   return (
      <Box>
         <Snackbar
            ContentProps={{
               sx: {
                  background: darkMode ? '#d3223d' : '#e60023',
                  margin: smWidth ? '0 0.5rem 0.5rem 0.5rem' : '0',
                  color: '#fff'
               }
            }}
            key={messageInfo ? messageInfo.key : undefined}
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionProps={{ onExited: handleExited }}
            message={snackbarText}
            action={
               <React.Fragment>
                  <IconButton
                     aria-label="close"
                     color="inherit"
                     sx={{ p: 0.5 }}
                     onClick={handleClose}
                  >
                     <CloseIcon />
                  </IconButton>
               </React.Fragment>
            }
         />
      </Box>
   );
}

export default CustomSnackbar;