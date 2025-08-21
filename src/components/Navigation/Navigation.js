import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar';
import SearchModal from './Navbar/SearchModal';
import CustomBackdrop from '../UI/CustomBackdrop';
import { toggleSidebar, uiValues } from '../../Redux/slices/uiSlice';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from './Navbar/UserProfile';
import CustomSnackbar from '../UI/CustomSnackbar'
import AuthErrorModal from '../Auth/AuthErrorModal';
import BackdropSpinner from '../UI/BackdropSpinner';
import { pinValues } from '../../Redux/slices/pinSlice';
import BackToTop from '../UI/BackToTop';
import Notification from './Navbar/Notification';

const Navigation = ({ children }) => {
   const [loading, setLoading] = useState(true);
   const { sidebar } = useSelector(uiValues);
   const { deletePinLoader } = useSelector(pinValues);
   const dispatch = useDispatch();

   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));

   useEffect(() => {
      if (lgWidth) {
         dispatch(toggleSidebar(false));
      } else {
         dispatch(toggleSidebar(true));
      }

      setLoading(false);
   }, [lgWidth, dispatch]);

   return (
      <>
         <CustomBackdrop />
         <Box>
            <Navbar lgWidth={lgWidth} />
            {!loading && <Sidebar lgWidth={lgWidth} />}
            <Box
               component='main'
               sx={theme => ({
                  paddingTop: '102px',
                  paddingBottom: '3rem',
                  paddingLeft: sidebar ? '276px' : 0,
                  transition: '200ms ease',
                  [theme.breakpoints.down('lg')]: {
                     paddingLeft: 0
                  },
                  [theme.breakpoints.down('md')]: {
                     paddingTop: '89px',
                     paddingBottom: '2.5rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     paddingTop: '76px'
                  }
               })}
            >
               {children}
            </Box>
         </Box>
         {/* <SearchModal /> */}
         <Notification />
         <UserProfile />
         <CustomSnackbar />
         <AuthErrorModal />
         <BackdropSpinner value={deletePinLoader} />
         <BackToTop />
      </>
   );
};

export default Navigation;