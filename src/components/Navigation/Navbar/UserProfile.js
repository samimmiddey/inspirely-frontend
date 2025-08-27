import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { setButtonIndex, setDarkMode, toggleUserProfile, uiValues } from '../../../Redux/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RiProfileFill, RiSettings2Fill } from 'react-icons/ri';
import CustomButton from '../../UI/CustomButton';
import Image from 'next/image';
import { logOut } from '../../../Redux/slices/authThunks';
import { authValues } from '../../../Redux/slices/authSlice';
import ButtonProgress from '../../UI/ButtonProgress';
import Link from 'next/link';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

export const userProfileData = [
   {
      icon: <RiProfileFill style={{ fontSize: '1.1rem' }} />,
      title: 'Profile',
      desc: 'My Profile',
      iconColor: 'primary.main',
      iconBg: 'bg.lightRed'
   },
   {
      icon: <RiSettings2Fill style={{ fontSize: '1.1rem' }} />,
      title: 'Settings',
      desc: 'Account Settings',
      iconColor: 'primary.main',
      iconBg: 'bg.lightRed'
   }
];

const iconStyle = theme => ({
   fontSize: '1.25rem',
   marginRight: '8px',
   [theme.breakpoints.down('xl')]: {
      fontSize: '1.2rem'
   },
   [theme.breakpoints.down(350)]: {
      display: 'none'
   }
});

const containerStyle = {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between'
};

const headerTextStyle = theme => ({
   fontSize: '1.1rem',
   fontWeight: 700,
   color: 'text.primary',
   [theme.breakpoints.down('lg')]: {
      fontSize: '1rem'
   }
});

const infoContainerStyle = theme => ({
   display: 'flex',
   alignItems: 'center',
   gap: '16px',
   padding: '14px 0',
   [theme.breakpoints.down('lg')]: {
      gap: '14px',
      padding: '12px 0'
   },
   [theme.breakpoints.down('sm')]: {
      gap: '14px',
      padding: '6px 0 12px 0'
   },
   [theme.breakpoints.down(375)]: {
      flexDirection: 'column',
      gap: '10px',
      textAlign: 'center'
   }
});

const infoNameStyle = theme => ({
   fontSize: '1rem',
   maxWidth: '200px',
   fontWeight: 600,
   color: 'text.primary',
   [theme.breakpoints.down('xl')]: {
      fontSize: '15px'
   },
   [theme.breakpoints.down('lg')]: {
      fontSize: '14px'
   }
});

const infoEmailStyle = theme => ({
   color: 'text.secondary',
   maxWidth: '200px',
   fontSize: '14px',
   fontWeight: 500,
   [theme.breakpoints.down('xl')]: {
      fontSize: '13px'
   }
});

const menuItemStyle = theme => ({
   width: '325px',
   padding: '15px',
   [theme.breakpoints.down('xl')]: {
      padding: '14px'
   },
   [theme.breakpoints.down(400)]: {
      width: '300px'
   },
   [theme.breakpoints.down(375)]: {
      width: '275px'
   },
   [theme.breakpoints.down(350)]: {
      width: '250px'
   },
   [theme.breakpoints.down(325)]: {
      width: '225px'
   },
   [theme.breakpoints.down(300)]: {
      width: '200px'
   }
});

const settingContainerStyle = theme => ({
   display: 'flex',
   alignItems: 'center',
   gap: '16px',
   [theme.breakpoints.down('xl')]: {
      gap: '14px'
   }
});

const settingTitleStyle = theme => ({
   color: 'text.primary',
   fontWeight: 600,
   fontSize: '15px',
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   }
});

const settingDescStyle = theme => ({
   color: 'text.secondary',
   fontSize: '14px',
   [theme.breakpoints.down('xl')]: {
      fontSize: '13px'
   }
});

const logoutBtnContainerStyle = theme => ({
   margin: '14px 0 8px 0',
   [theme.breakpoints.down('lg')]: {
      marginTop: '12px'
   }
});

const UserProfile = () => {
   const { authLoading, userProfileAnchorEl, buttonIndex } = useSelector(uiValues);
   const { user } = useSelector(authValues);

   const dispatch = useDispatch();

   const open = Boolean(userProfileAnchorEl);

   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));
   const mobileWidth = useMediaQuery(theme.breakpoints.down('xs'));

   const handleClose = () => {
      dispatch(toggleUserProfile(null));
   };

   return (
      <Menu
         anchorEl={userProfileAnchorEl}
         open={open}
         onClose={handleClose}
         PaperProps={{
            elevation: 0,
            sx: {
               overflow: 'visible',
               padding: lgWidth && !mobileWidth ? '10px 23px' : lgWidth && mobileWidth ? '10px 20px' : '12px 25px',
               filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.075))',
               mt: 1.5,
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
         <Box sx={containerStyle}>
            <Typography
               variant='h4'
               sx={headerTextStyle}
            >
               User Profile
            </Typography>
            <IconButton
               size='medium'
               onClick={handleClose}
            >
               <CloseOutlinedIcon sx={{ color: '#e60023' }} />
            </IconButton>
         </Box>
         <Box sx={infoContainerStyle}>
            <Image
               src={user.photoURL ? user.photoURL : '/avatar.png'}
               alt=""
               height={60}
               width={60}
               objectFit='cover'
               style={{ borderRadius: '50%' }}
               quality={50}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
               <Typography
                  className='text-wrap'
                  sx={infoNameStyle}
               >
                  {user.name}
               </Typography>
               <Typography
                  className='text-wrap'
                  sx={infoEmailStyle}
               >
                  {user.email}
               </Typography>
            </Box>
         </Box>
         <Box sx={{ margin: '10px 0', width: '100%' }}>
            <ButtonGroup
               variant='outlined'
               sx={{ width: '100%' }}
            >
               {
                  [
                     { text: 'Light Mode', icon: <WbSunnyOutlinedIcon sx={iconStyle} /> },
                     { text: 'Dark Mode', icon: <DarkModeOutlinedIcon sx={iconStyle} /> }
                  ].map((item, index) => (
                     <Button
                        disableRipple
                        onClick={() => {
                           if (index === 0) {
                              dispatch(setButtonIndex(0));
                              dispatch(setDarkMode(false));
                              localStorage.removeItem('inspirelyDarkMode');
                              localStorage.removeItem('darkModeButtonIndex');
                           } else {
                              dispatch(setButtonIndex(1));
                              dispatch(setDarkMode(true));
                              localStorage.setItem('inspirelyDarkMode', JSON.stringify(true));
                              localStorage.setItem('darkModeButtonIndex', JSON.stringify(1));
                           }
                        }}
                        key={index}
                        sx={theme => ({
                           width: '100%',
                           textTransform: 'none',
                           padding: 0,
                           fontSize: '14px',
                           height: '42px',
                           backgroundColor: buttonIndex === index && 'bg.lightRed',
                           color: buttonIndex === index ? 'primary.main' : 'text.secondary',
                           '&:hover': {
                              backgroundColor: buttonIndex === index ? 'bg.lightRed' : 'transparent'
                           },
                           [theme.breakpoints.down('xl')]: {
                              fontSize: '13px',
                              height: '40px'
                           }
                        })}
                     >
                        {item.icon}{item.text}
                     </Button>
                  ))
               }
            </ButtonGroup>
         </Box>
         {
            userProfileData.map((item, index) => (
               <Link href={index === 0 ? `/profile/${user.id}` : '/account-settings/general-info'} key={index}>
                  <Box>
                     <>
                        <Box>
                           <MenuItem
                              onClick={handleClose}
                              sx={menuItemStyle}
                           >
                              <Box sx={settingContainerStyle}>
                                 <Button
                                    variant='contained'
                                    disableElevation
                                    sx={theme => ({
                                       minWidth: '42px',
                                       minHeight: '42px',
                                       padding: 0,
                                       borderRadius: '10px',
                                       backgroundColor: item.iconBg,
                                       color: item.iconColor,
                                       '&:hover': {
                                          backgroundColor: item.iconBg,
                                          opacity: 0.8
                                       },
                                       [theme.breakpoints.down('xl')]: {
                                          minWidth: '40px',
                                          minHeight: '40px'
                                       }
                                    })}
                                 >
                                    {item.icon}
                                 </Button>
                                 <Box>
                                    <Typography sx={settingTitleStyle}>{item.title}</Typography>
                                    <Typography sx={settingDescStyle}>{item.desc}</Typography>
                                 </Box>
                              </Box>
                           </MenuItem>
                        </Box>
                        {index !== userProfileData.length - 1 && <Divider sx={{ margin: '0' }} />}
                     </>
                  </Box>
               </Link>
            ))
         }
         <Box
            onClick={() => {
               handleClose();
               dispatch(logOut());
            }}
            sx={logoutBtnContainerStyle}
         >
            <CustomButton
               background={!authLoading && 'primary.main'}
               color='#fff'
               type='button'
               loading={authLoading}
            >
               {authLoading ? <ButtonProgress /> : 'Sign out'}
            </CustomButton>
         </Box>
      </Menu>
   );
};

export default UserProfile;