import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import NavLogo from './Navbar/NavLogo';
import { categories } from '../Data/data';
import { setSidebarRouteIndex, toggleSidebar, uiValues } from '../../Redux/slices/uiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomMenuIcon from '../UI/CustomMenuIcon';
import { FaTimes } from 'react-icons/fa';

const drawerWidth = 276;

const backdropStyle = theme => ({
   display: 'none',
   [theme.breakpoints.down('lg')]: {
      zIndex: 99999999,
      display: 'block'
   }
});

const drawerStyle = theme => ({
   width: drawerWidth,
   flexShrink: 0,
   '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      borderWidth: 0,
      boxShadow: '0 0 50px rgba(0, 0, 0, 0.015)'
   },
   [theme.breakpoints.down('lg')]: {
      zIndex: 99999999
   }
});

const logoContainerStyle = theme => ({
   display: 'flex',
   alignItems: 'center',
   position: 'fixed',
   top: 0,
   left: 0,
   width: '276px',
   zIndex: 99,
   paddingLeft: '2.5rem',
   height: '75px',
   [theme.breakpoints.down('lg')]: {
      paddingLeft: '1.5rem',
      justifyContent: 'space-between'
   },
   [theme.breakpoints.down('md')]: {
      height: '70px',
      paddingLeft: '1.1rem',
   },
   [theme.breakpoints.down('sm')]: {
      height: '65px'
   },
   [theme.breakpoints.down('350')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
   }
});

const closeBtnContainerStyle = theme => ({
   display: 'none',
   [theme.breakpoints.down('lg')]: {
      display: 'block',
      paddingRight: '1rem'
   }
});

const closeBtnStyle = {
   fontSize: '1.25rem',
   color: '#e60023'
};

const categoryContainerStyle = theme => ({
   marginTop: '75px',
   overflowY: 'hidden',
   '&:hover': {
      overflowY: 'auto'
   },
   paddingBottom: '2rem',
   overflowX: 'hidden',
   [theme.breakpoints.down('lg')]: {
      overflowY: 'auto'
   },
   [theme.breakpoints.down('md')]: {
      marginTop: '70px'
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '65px'
   }
});

const categoryTextStyle = theme => ({
   fontSize: '15px',
   fontWeight: 500,
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   }
});

const Sidebar = ({ lgWidth }) => {
   const { sidebar, sidebarRouteIndex } = useSelector(uiValues);
   const dispatch = useDispatch();

   const router = useRouter();

   useEffect(() => {
      if (
         !categories.find(item => (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()))
      ) {
         dispatch(setSidebarRouteIndex(null));
      }
   }, [router, dispatch]);

   return (
      <>
         <Backdrop
            onClick={() => dispatch(toggleSidebar(!sidebar))}
            open={sidebar}
            sx={backdropStyle}
         />
         <Box sx={{ display: 'flex' }}>
            <Drawer
               variant="persistent"
               anchor="left"
               open={sidebar}
               sx={drawerStyle}
            >
               <Box sx={logoContainerStyle}>

                  {/* Logo */}
                  <NavLogo
                     showMenu={false}
                     showLogo={true}
                     lgWidth={lgWidth}
                     notHide={true}
                  />

                  {/* Close Button */}
                  <Box
                     sx={closeBtnContainerStyle}
                     onClick={() => dispatch(toggleSidebar(!sidebar))}
                  >
                     <CustomMenuIcon title='Menu'>
                        <FaTimes style={closeBtnStyle} />
                     </CustomMenuIcon>
                  </Box>

               </Box>

               {/* Categories List */}
               <Box sx={categoryContainerStyle}>
                  {
                     categories.map((item, index) => (
                        <Link
                           key={index}
                           href={item.text === 'Home' ? '/' : `/${item.text.split(' ').join('').toLowerCase()}`}
                        >
                           <ListItemButton
                              key={index}
                              // disableRipple
                              onClick={() => {
                                 dispatch(setSidebarRouteIndex(index));
                                 if (lgWidth) {
                                    dispatch(toggleSidebar(!sidebar));
                                 }
                              }}
                              sx={theme => ({
                                 margin: '5px 16px 5px 20px',
                                 borderRadius: '5px',
                                 px: 0.75,
                                 borderRadius: '8px',
                                 justifyContent: 'initial',
                                 backgroundColor: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? ('bg.lightRed') : '',
                                 '&:hover': {
                                    backgroundColor: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? ('bg.lightRed') : ''
                                 },
                                 [theme.breakpoints.down('xl')]: {
                                    padding: '6px'
                                 },
                                 [theme.breakpoints.down('lg')]: {
                                    margin: '5px 10px 5px 20px'
                                 },
                                 [theme.breakpoints.down('sm')]: {
                                    margin: '5px 10px 5px 16px'
                                 }
                              })}
                           >
                              <ListItemIcon
                                 sx={{
                                    color: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? 'primary.main' : 'text.secondary',
                                    mr: 0.75,
                                    justifyContent: 'center',
                                 }}
                              >
                                 {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                 primary={<Typography sx={categoryTextStyle}>{item.text}</Typography>}
                                 sx={{
                                    color: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? 'primary.main' : 'text.secondary'
                                 }}
                              />
                           </ListItemButton>
                        </Link>
                     ))
                  }
               </Box>

            </Drawer>
         </Box>
      </>
   );
};

export default Sidebar;