import React from 'react';
import Image from 'next/image';
import { Box, Card, Tooltip, Typography } from '@mui/material';
import { GoVerified, GoUnverified } from 'react-icons/go';
import CustomButton from './CustomButton';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';
import { authValues } from '../../Redux/slices/authSlice';
import { urlFor } from '../../Client/client';

const ProfileCard = ({ userData }) => {
   const { darkMode } = useSelector(uiValues);
   const { user } = useSelector(authValues);

   return (
      <Card
         className='card-padding'
         elevation={0}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
         }}
      >
         <Image
            src={userData.image ? urlFor(userData.image).width(75).url() : '/avatar.png'}
            alt=''
            height={75}
            width={75}
            style={{ borderRadius: '50%' }}
         />
         <Box
            sx={{
               position: 'relative',
               width: '100%',
               marginTop: '10px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center'
            }}>
            <Typography
               sx={{
                  fontWeight: 600,
                  color: 'text.primary'
               }}
            >
               {userData.userName}
            </Typography>
            <Box
               sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: '8px',
                  marginBottom: '12px',
               }}
            >
               <Typography
                  className='text-wrap'
                  sx={{
                     fontSize: '14px',
                     fontWeight: 500,
                     color: 'text.secondary',
                     maxWidth: '100%'
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
            <Link href={`/profile/${userData._id}`}>
               <Box>
                  <CustomButton
                     background={darkMode ? '#2c303a' : '#F2F3F4'}
                     border='1px solid primary.main'
                     variant='outlined'
                     height='38px'
                  >
                     Visit Profile
                  </CustomButton>
               </Box>
            </Link>
         </Box>
      </Card>
   );
};

export default ProfileCard;