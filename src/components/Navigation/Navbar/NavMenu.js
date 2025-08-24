import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { FiSearch } from 'react-icons/fi';
import CustomMenuIcon from '../../UI/CustomMenuIcon';
import { setInputFocus, setNotificationAnchorEl, setSearchModal, toggleUserProfile, uiValues } from '../../../Redux/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { authValues } from '../../../Redux/slices/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { addNotificationData, addNotificationDataWhenUserIsOffline, getNotificationCount, getNotificationsData } from '../../../Redux/slices/pinThunks';
import { pinValues } from '../../../Redux/slices/pinSlice';

const containerStyle = theme => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '10px',
   [theme.breakpoints.down('sm')]: {
      columnGap: '5px'
   }
});

const searchIconContainerStyle = theme => ({
   display: 'none',
   [theme.breakpoints.down('md')]: {
      display: 'block'
   }
});

const notificationIconStyle = theme => ({
   fontSize: '1.75rem',
   color: 'text.iconLight',
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem'
   }
});

const createIconStyle = theme => ({
   fontSize: '1.75rem',
   color: 'text.iconLight',
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem'
   }
});

const profileCircleStyle = {
   display: 'flex',
   alignItems: 'center',
   height: '36px',
   width: '36px',
   borderRadius: '50%'
};

const NavMenu = () => {
   const { user } = useSelector(authValues);
   const { socket } = useSelector(uiValues);
   const { notificationCount } = useSelector(pinValues);
   const dispatch = useDispatch();

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   // Set notification data to the database
   useEffect(() => {
      socket.on("userOffline", data => {
         dispatch(addNotificationDataWhenUserIsOffline(data.receiverID, data));
      });
   }, [socket, dispatch]);

   // Set notification data to the database
   useEffect(() => {
      socket.on("getNotification", data => {
         dispatch(addNotificationData(user.id, data));
      });
   }, [socket, dispatch, user.id]);

   // Get existing notifications
   useEffect(() => {
      dispatch(getNotificationCount(user.id));
      dispatch(getNotificationsData(user.id));
   }, [dispatch, user.id]);

   return (
      <Box sx={containerStyle}>
         <Box
            onClick={() => {
               dispatch(setSearchModal(true));
               dispatch(setInputFocus(true));
            }}
            sx={searchIconContainerStyle}
         >
            <CustomMenuIcon title='Search'>
               <FiSearch
                  style={{
                     fontSize: smWidth ? '1.3rem' : '1.5rem',
                     color: '#868395'
                  }}
               />
            </CustomMenuIcon>
         </Box>
         {
            [NotificationsIcon, AddCircleOutlinedIcon].map((Icon, index) => (
               <Box
                  key={index}
                  onClick={e => index === 0 && dispatch(setNotificationAnchorEl(e.currentTarget))}
               >
                  <CustomMenuIcon
                     title={index === 0 ? 'Notification' : 'Upload'}
                     sx={{ marginRight: index === 1 && '10px' }}
                  >
                     {
                        index === 0 ? (
                           <Badge
                              badgeContent={notificationCount}
                              color='primary'
                           >
                              <Icon sx={notificationIconStyle} />
                           </Badge>
                        ) : (
                           <Link href='/create-pin'>
                              <Icon sx={createIconStyle} />
                           </Link>
                        )
                     }
                  </CustomMenuIcon>
               </Box>
            ))
         }
         <Tooltip title='Profile' arrow>
            <Box
               onClick={event => dispatch(toggleUserProfile(event.currentTarget))}
               sx={profileCircleStyle}
            >
               <Image
                  src={user.photoURL ? user.photoURL : '/avatar.png'}
                  alt='avatar'
                  height={36}
                  width={36}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                  objectFit='cover'
               />
            </Box>
         </Tooltip>
      </Box >
   );
};

export default NavMenu;