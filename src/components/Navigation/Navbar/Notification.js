import React, { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import { Box, Button, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationAnchorEl, uiValues } from '../../../Redux/slices/uiSlice';
import CustomButton from '../../UI/CustomButton';
import { pinValues, setGetScrolledNotifications } from '../../../Redux/slices/pinSlice';
import NotificationItem from '../../UI/NotificationItem';
import { loadMoreNotifications } from '../../../Redux/slices/pinThunks';
import { authValues } from '../../../Redux/slices/authSlice';
import ButtonProgress from '../../UI/ButtonProgress';
import Image from 'next/image';

const Notification = () => {
   const { notificationAnchorEl, darkMode } = useSelector(uiValues);
   const { notificationData, notificationLoading, getScrolledNotifications, notificationCount, notificationError } = useSelector(pinValues);
   const { user } = useSelector(authValues);
   const dispatch = useDispatch();

   const open = Boolean(notificationAnchorEl);

   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));
   const mobileWidth = useMediaQuery(theme.breakpoints.down(450));
   const smallWidth = useMediaQuery(theme.breakpoints.down(350));

   const handleClose = () => {
      dispatch(setNotificationAnchorEl(null));
   };

   // Set initial state
   useEffect(() => {
      dispatch(setGetScrolledNotifications(true));
   }, [dispatch]);

   return (
      <Menu
         anchorEl={notificationAnchorEl}
         id="account-menu"
         open={open}
         onClose={handleClose}
         PaperProps={{
            elevation: 0,
            sx: {
               overflow: 'visible',
               padding: lgWidth && !mobileWidth ? '10px 23px' : lgWidth && mobileWidth ? '10px 20px' : '12px 25px',
               filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.075))',
               mt: 1,
               '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
               },
               '&:before': {
                  content: '""',
                  display: mobileWidth ? 'none' : 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
               },
            },
         }}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between'
            }}
         >
            <Box
               sx={theme => ({
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '16px',
                  [theme.breakpoints.down(350)]: {
                     columnGap: '8px'
                  }
               })}
            >
               <Typography
                  sx={theme => ({
                     fontSize: '1.1rem',
                     fontWeight: 600,
                     color: 'text.primary',
                     [theme.breakpoints.down('lg')]: {
                        fontSize: '1rem'
                     }
                  })}
               >
                  Notifications
               </Typography>
               <Button
                  variant='contained'
                  disableElevation
                  disableRipple
                  sx={{
                     minHeight: 0,
                     minWidth: 0,
                     padding: '0 10px',
                     backgroundColor: 'primary.main',
                     textTransform: 'none',
                     fontSize: '12px',
                     color: 'white',
                     '&:hover': {
                        backgroundColor: 'primary.main'
                     }
                  }}
               >
                  {notificationCount} new
               </Button>
            </Box>
            <IconButton
               size='medium'
               onClick={handleClose}
            >
               <CloseOutlinedIcon sx={{ color: 'primary.main' }} />
            </IconButton>
         </Box>
         <Box sx={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
            {
               !notificationError ?
                  (
                     notificationData.length === 0 ? (
                        <Typography
                           sx={theme => ({
                              fontWeight: 600,
                              color: 'text.primary',
                              marginTop: '8px',
                              width: '325px',
                              padding: '1rem 0',
                              textAlign: 'center',
                              [theme.breakpoints.down('lg')]: {
                                 padding: '14px 0'
                              },
                              [theme.breakpoints.down('xs')]: {
                                 textAlign: 'start'
                              }
                           })}
                        >
                           No new notifications!
                        </Typography>
                     ) : (
                        notificationData.map((item, index) => (
                           <NotificationItem
                              key={index}
                              handleClose={handleClose}
                              item={item}
                              smallWidth={smallWidth}
                              darkMode={darkMode}
                           />
                        ))
                     )
                  ) : (
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           justifyContent: 'center',
                           marginTop: '1rem'
                        }}
                     >
                        <Image
                           src={darkMode ? '/notification-dark.png' : '/notification-light.png'}
                           alt=''
                           height={200}
                           width={325}
                           objectFit='contain'
                        />
                        <Typography
                           sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              padding: '0.5rem 0 5px 0',
                              textAlign: 'center',
                              maxWidth: '325px'
                           }}
                        >
                           Something went wrong!
                        </Typography>
                        <Typography
                           sx={{
                              color: 'text.secondary',
                              textAlign: 'center',
                              padding: '0 0 1rem 0',
                              fontSize: '15px',
                              maxWidth: '325px'
                           }}
                        >
                           {notificationError.charAt(0).toUpperCase() + notificationError.slice(1)}
                        </Typography>
                     </Box>
                  )
            }
         </Box>
         {
            !getScrolledNotifications && !notificationLoading ? (
               <Typography
                  sx={theme => ({
                     textAlign: 'center',
                     fontSize: '1rem',
                     fontWeight: 600,
                     color: 'text.primary',
                     marginTop: '1rem',
                     [theme.breakpoints.down(350)]: {
                        fontSize: '14px'
                     }
                  })}
               >
                  All notifications are loaded!
               </Typography>
            ) : (
               <Box
                  onClick={() => {
                     if (notificationError) {
                        window.location.reload();
                     } else {
                        dispatch(loadMoreNotifications(user.id));
                     }
                  }}
                  sx={{ margin: '12px 0 8px 0' }}
               >
                  {
                     notificationError ? (
                        <CustomButton
                           background={!notificationLoading && 'primary.main'}
                           color='#fff'
                           type='button'
                           loading={notificationLoading}
                        >
                           Refresh
                        </CustomButton>
                     ) : (
                        <CustomButton
                           background={!notificationLoading && 'primary.main'}
                           color='#fff'
                           type='button'
                           loading={notificationLoading}
                        >
                           {notificationLoading ? <ButtonProgress /> : 'Load more'}
                        </CustomButton>
                     )
                  }
               </Box>
            )
         }
      </Menu >
   );
}

export default Notification;