import React from 'react';
import { Box, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { pinValues } from '../../Redux/slices/pinSlice';
import PinMasonryGrid from '../UI/PinMasonryGrid';
import CustomHeader from '../UI/CustomHeader';
import CustomTabs from '../UI/CustomTabs';
import CustomSpinner from '../UI/CustomSpinner';
import { GoUnverified, GoVerified } from 'react-icons/go';
import Link from 'next/link';
import CustomButton from '../UI/CustomButton';
import CustomErrorCard from '../UI/CustomErrorCard';
import NoPinTemplate from '../UI/NoPinTemplate';
import { authValues } from '../../Redux/slices/authSlice';
import { uiValues } from '../../Redux/slices/uiSlice';
import { loadUserPinsOnScroll } from '../../Redux/slices/pinThunks';
import { urlFor } from '../../Client/client';

const Profile = ({ userData, pins, error, saveError, value, loading, tabValue, userID }) => {
   const { user } = useSelector(authValues);
   const { createdPins, savedPins } = useSelector(pinValues);
   const { darkMode } = useSelector(uiValues);

   const dispatch = useDispatch();

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   const allPins = createdPins.length >= 1 ? createdPins : pins;

   // Load more pins on scroll
   const handleScroll = () => {
      dispatch(loadUserPinsOnScroll(tabValue, userID));
   };

   return (
      <Box sx={{ marginTop: '10px' }}>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center'
            }}
         >
            <Box sx={{ padding: '3px', borderRadius: '50%', backgroundColor: 'primary.main' }}>
               <Box
                  sx={{
                     padding: '3px',
                     borderRadius: '50%',
                     backgroundColor: darkMode ? '#99a0b2' : '#F2F3F4',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center'
                  }}
               >
                  <Image
                     src={userData.image ? urlFor(userData.image).width(100).url() : '/avatar.png'}
                     alt=''
                     height={smWidth ? 75 : 100}
                     width={smWidth ? 75 : 100}
                     style={{ borderRadius: '50%' }}
                     objectFit='cover'
                  />
               </Box>
            </Box>
            <CustomHeader
               text={userData.userName}
               margin='1rem 0 0 0'
            />
            <Box
               sx={{
                  marginBottom: user.about ? '8px' : '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: '8px',
                  width: '100%'
               }}
            >
               <Typography
                  className='text-wrap'
                  sx={{
                     fontSize: '14px',
                     fontWeight: 500,
                     color: 'text.secondary',
                     maxWidth: '90%'
                  }}
               >
                  {userData.email}
               </Typography>
               {
                  !(userData.email === 'Signed in with Google' || userData.email === 'Signed in with Facebook') && (
                     userData.verified ? (
                        <Tooltip title='Verified' placement='bottom'>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <GoVerified
                                 style={{
                                    color: '#00b3b3',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                 }}
                              />
                           </Box>
                        </Tooltip>
                     ) : (
                        (
                           user.id === userData._id &&
                           <Tooltip title='Not verified' placement='bottom'>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                 <GoUnverified
                                    style={{
                                       color: '#868395',
                                       cursor: 'pointer',
                                       fontSize: '14px'
                                    }}
                                 />
                              </Box>
                           </Tooltip>
                        )
                     )
                  )
               }
            </Box>
            {
               userData.website &&
               <Typography
                  className='text-wrap'
                  sx={{
                     marginBottom: '8px',
                     color: 'secondary.main',
                     fontWeight: 600,
                     fontSize: '14px',
                     width: '100%',
                     textAlign: 'center'
                  }}
               >
                  <a href={userData.website} target='_blank' rel='noreferrer'>
                     {userData.website}
                  </a>
               </Typography>
            }
            {
               userData.about &&
               <Typography
                  sx={theme => ({
                     marginBottom: '1rem',
                     fontSize: '14px',
                     fontWeight: 500,
                     color: 'text.secondary',
                     textAlign: 'center',
                     width: '35%',
                     [theme.breakpoints.down('xl')]: {
                        width: '40%'
                     },
                     [theme.breakpoints.down('lg')]: {
                        width: '45%'
                     },
                     [theme.breakpoints.down('md')]: {
                        width: '60%'
                     },
                     [theme.breakpoints.down('sm')]: {
                        width: '75%'
                     },
                     [theme.breakpoints.down('xs')]: {
                        width: '90%'
                     },
                     [theme.breakpoints.down(350)]: {
                        width: '100%'
                     }
                  })}
               >
                  {userData.about}
               </Typography>
            }
            {
               (userData._id === user.id) &&
               <Link href='/account-settings/general-info'>
                  <Box sx={{ marginBottom: '1rem' }}>
                     <CustomButton
                        background={darkMode ? '#21242c' : '#F2F3F4'}
                        border='1px solid primary.main'
                        variant='outlined'
                        height='38px'
                     >
                        Edit Profile
                     </CustomButton>
                  </Box>
               </Link>
            }
         </Box>
         <CustomTabs
            value={value}
            labelOne='Created Pins'
            labelTwo='Saved Pins'
         />
         {((error && value === 'one')) && <CustomErrorCard errorText={error} />}
         {((saveError && value === 'two')) && <CustomErrorCard errorText={saveError} />}
         {((allPins.length === 0 && value === 'one')) && <NoPinTemplate />}
         {((savedPins.length === 0 && value === 'two' && !loading)) && <NoPinTemplate />}
         {loading && value === 'two' && <CustomSpinner />}
         {
            (value === 'one' && !loading) &&
            <PinMasonryGrid
               posts={allPins}
               handleScroll={handleScroll}
            />
         }
         {
            (value === 'two' && !loading) &&
            <PinMasonryGrid
               posts={savedPins}
               handleScroll={handleScroll}
            />
         }
      </Box>
   );
};

export default Profile;