import React, { useEffect } from 'react';
import { Backdrop, Box, Drawer, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import NavLogo from './Navbar/NavLogo';
import { categories } from '../Data/data';
import { setSidebarRouteIndex, toggleSidebar, uiValues } from '../../Redux/slices/uiSlice';
import { useSelector, useDispatch } from 'react-redux';
import CustomMenuIcon from '../UI/CustomMenuIcon';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

const drawerWidth = 276;

const Sidebar = ({ lgWidth }) => {
   const { sidebar, sidebarRouteIndex, darkMode } = useSelector(uiValues);
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
            sx={theme => ({
               display: 'none',
               [theme.breakpoints.down('lg')]: {
                  zIndex: 99999999,
                  display: 'block'
               }
            })}
         />
         <Box sx={{ display: 'flex' }}>
            <Drawer
               variant="persistent"
               anchor="left"
               open={sidebar}
               sx={theme => ({
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
               })}
            >
               {/* Logo */}
               <Box
                  sx={theme => ({
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
                        paddingLeft: '1.5rem'
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
                  })}
               >
                  <NavLogo
                     showMenu={lgWidth ? true : false}
                     showLogo={true}
                     lgWidth={lgWidth}
                  />
                  <Box
                     sx={theme => ({
                        display: 'none',
                        [theme.breakpoints.down(350)]: {
                           display: 'block',
                           paddingRight: '1.1rem'
                        }
                     })}
                     onClick={() => dispatch(toggleSidebar(!sidebar))}
                  >
                     <CustomMenuIcon title='Menu'>
                        <FaTimes
                           style={{
                              fontSize: '1.5rem',
                              color: '#868395'
                           }}
                        />
                     </CustomMenuIcon>
                  </Box>
               </Box>
               {/* Categories List */}
               <Box
                  sx={theme => ({
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
                  })}
               >
                  {
                     categories.map((item, index) => (
                        <Link
                           key={index}
                           href={item.text === 'Home' ? '/' : `/${item.text.split(' ').join('').toLowerCase()}`}
                        >
                           <ListItemButton
                              onClick={() => {
                                 dispatch(setSidebarRouteIndex(index));
                                 if (lgWidth) {
                                    dispatch(toggleSidebar(!sidebar));
                                 }
                              }}
                              disableRipple
                              key={index}
                              sx={theme => ({
                                 margin: '5px 16px 5px 20px',
                                 borderRadius: '5px',
                                 px: 1,
                                 justifyContent: 'initial',
                                 backgroundColor: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? (darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)') : '',
                                 '&:hover': {
                                    backgroundColor: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? (darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)') : ''
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
                                    color: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? 'text.primary' : 'text.secondary',
                                    mr: 1,
                                    justifyContent: 'center',
                                 }}
                              >
                                 {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                 primary={
                                    <Typography style={{ fontSize: '15px', fontWeight: 500 }}>
                                       {item.text}
                                    </Typography>
                                 }
                                 sx={{
                                    color: sidebarRouteIndex === index || (item.text === 'Home' ? router.asPath : router.asPath.replace('/', '')) === (item.text === 'Home' ? '/' : item.text.split(' ').join('').toLowerCase()) ? 'text.primary' : 'text.secondary'
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