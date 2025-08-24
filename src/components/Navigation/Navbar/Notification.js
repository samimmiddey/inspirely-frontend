import { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationAnchorEl, uiValues } from '../../../Redux/slices/uiSlice';
import CustomButton from '../../UI/CustomButton';
import { pinValues, setGetScrolledNotifications } from '../../../Redux/slices/pinSlice';
import NotificationItem from './NotificationItem';
import { loadMoreNotifications } from '../../../Redux/slices/pinThunks';
import { authValues } from '../../../Redux/slices/authSlice';
import ButtonProgress from '../../UI/ButtonProgress';
import Image from 'next/image';

const headerContainerStyle = {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between'
};

const headerInfoContainerStyle = theme => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '16px',
   [theme.breakpoints.down('xl')]: {
      columnGap: '12px'
   },
   [theme.breakpoints.down(350)]: {
      columnGap: '8px'
   }
});

const headerTitleStyle = theme => ({
   fontSize: '1.1rem',
   fontWeight: 700,
   color: 'text.primary',
   [theme.breakpoints.down('xl')]: {
      fontSize: '1rem'
   }
});

const notificationCountStyle = {
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
};

const notificationBtnStyle = {
   maxHeight: '400px',
   overflowY: 'auto',
   overflowX: 'hidden'
};

const noNotificationTextStyle = theme => ({
   fontWeight: 600,
   color: 'text.primary',
   marginTop: '8px',
   width: '325px',
   padding: '1rem 0',
   textAlign: 'center',
   [theme.breakpoints.down('xl')]: {
      padding: '14px 0'
   },
   [theme.breakpoints.down('xs')]: {
      textAlign: 'start'
   }
});

const errorContainerStyle = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: '1rem'
};

const errorTextStyle = {
   fontWeight: 600,
   color: 'text.primary',
   padding: '0.5rem 0 5px 0',
   textAlign: 'center',
   maxWidth: '325px'
};

const errorSubTextStyle = {
   color: 'text.secondary',
   textAlign: 'center',
   padding: '0 0 1rem 0',
   fontSize: '15px',
   maxWidth: '325px'
};

const allLoadedTextStyle = theme => ({
   textAlign: 'center',
   fontSize: '1rem',
   fontWeight: 600,
   color: 'text.primary',
   marginTop: '1rem',
   [theme.breakpoints.down('xl')]: {
      fontSize: '15px'
   },
   [theme.breakpoints.down(350)]: {
      fontSize: '14px'
   }
});

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
         <Box sx={headerContainerStyle}>
            <Box sx={headerInfoContainerStyle}>
               <Typography variant='h4' sx={headerTitleStyle}>Notifications</Typography>
               <Button
                  variant='contained'
                  disableElevation
                  disableRipple
                  sx={notificationCountStyle}
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
         <Box sx={notificationBtnStyle}>
            {
               !notificationError ?
                  (
                     notificationData.length === 0 ? (
                        <Typography
                           variant='h4'
                           sx={noNotificationTextStyle}
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
                     <Box sx={errorContainerStyle}>
                        <Image
                           src={darkMode ? '/notification-dark.png' : '/notification-light.png'}
                           alt=''
                           height={200}
                           width={325}
                           objectFit='contain'
                        />
                        <Typography sx={errorTextStyle}>Something went wrong!</Typography>
                        <Typography sx={errorSubTextStyle}>
                           {notificationError.charAt(0).toUpperCase() + notificationError.slice(1)}
                        </Typography>
                     </Box>
                  )
            }
         </Box>
         {
            !getScrolledNotifications && !notificationLoading ? (
               <Typography sx={allLoadedTextStyle}>All notifications are loaded!</Typography>
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
};

export default Notification;