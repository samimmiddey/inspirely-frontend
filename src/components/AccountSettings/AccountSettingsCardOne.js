import { Box, Button, Card, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AccountSettingsNav from './AccountSettingsNav';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { uploadPicture, verifyEmail } from '../../Redux/slices/authThunks';
import { useDispatch, useSelector } from 'react-redux';
import ButtonProgress from '../UI/ButtonProgress';
import AccountSettingsNavMobile from './AccountSettingsNavMobile';
import { uiValues } from '../../Redux/slices/uiSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authValues } from '../../Redux/slices/authSlice';
import UploadPicture from './UploadPicture';

const defaultValue = {
   image: null
};

const AccountSettingsCardOne = ({ user, settingsID, verifyEmailLoading, mdWidth, smWidth }) => {
   const { darkMode } = useSelector(uiValues);
   const { uploadPicLoading } = useSelector(authValues);
   const [imageFile, setImageFile] = useState(null);
   const [imageURL, setImageURL] = useState(null);
   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      image: Yup.mixed()
         .test('fileSize', 'The file is too large', (value) => {
            return value && value[0] && value[0].size <= 20000000;
         })
         .test('type', 'We only support JPG, PNG & SVG', (value) => {
            return value && value[0] && (
               value[0].type === 'image/jpeg' ||
               value[0].type === 'image/png' ||
               value[0].type === 'image/svg'
            );
         })
   });

   const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: {
         errors
      }
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValue
   });

   // Handle upload picture
   const handleUploadPicture = (data) => {
      dispatch(uploadPicture(data));
   };

   // Reset field
   useEffect(() => {
      if (!uploadPicLoading) {
         setImageFile(null);
         setImageURL(null);
         reset({ ...defaultValue });
      }
   }, [uploadPicLoading, reset]);

   return (
      <Card
         elevation={0}
         sx={theme => ({
            paddingBottom: '8px',
            [theme.breakpoints.down('md')]: {
               paddingBottom: 0
            }
         })}
      >
         <form onSubmit={handleSubmit((data) => handleUploadPicture(data))}>
            <Box
               className='card-padding'
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
               }}
            >
               {/* Picture Component */}
               <UploadPicture
                  user={user}
                  register={register}
                  errors={errors}
                  imageURL={imageURL}
                  setImageURL={setImageURL}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  darkMode={darkMode}
                  smWidth={smWidth}
                  getValues={getValues}
                  reset={reset}
                  uploadPicLoading={uploadPicLoading}
               />
               <Typography
                  className='text-wrap'
                  sx={theme => ({
                     marginTop: '12px',
                     color: 'text.primary',
                     fontSize: '1.35rem',
                     fontWeight: 600,
                     maxWidth: '100%',
                     [theme.breakpoints.down('lg')]: {
                        fontSize: '1.2rem'
                     },
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1rem'
                     }
                  })}
               >
                  {user.name}
               </Typography>
               <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
                  <Typography
                     className='text-wrap'
                     sx={theme => ({
                        color: 'text.secondary',
                        fontSize: '13px',
                        textAlign: 'center',
                        maxWidth: '250px',
                        [theme.breakpoints.down('xl')]: {
                           maxWidth: '225px'
                        },
                        [theme.breakpoints.down('md')]: {
                           maxWidth: '250px'
                        },
                        [theme.breakpoints.down(350)]: {
                           maxWidth: '195px'
                        }
                     })}
                  >
                     {user.email}
                  </Typography>
                  {
                     !(user.email === 'Signed in with Google' || user.email === 'Signed in with Facebook') &&
                     (
                        user.verified ? (
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
                  }
               </Box>
               {
                  !(user.email === 'Signed in with Google' || user.email === 'Signed in with Facebook') &&
                  (
                     !user.verified &&
                     <Button
                        onClick={() => dispatch(verifyEmail(user.id))}
                        sx={{
                           width: '82px',
                           height: '20px',
                           backgroundColor: '#ddd',
                           marginTop: '8px',
                           fontSize: '11px',
                           borderRadius: '5px',
                           textTransform: 'none',
                           color: '#868395',
                           '&:hover': {
                              backgroundColor: '#ddd'
                           }
                        }}
                     >
                        {verifyEmailLoading ? <ButtonProgress height={10} width={10} /> : 'Verify Email'}
                     </Button>
                  )
               }
            </Box>
         </form>
         {
            mdWidth ?
               <AccountSettingsNavMobile settingsID={settingsID} mdWidth={mdWidth} user={user} /> :
               <AccountSettingsNav settingsID={settingsID} />
         }
      </Card >
   );
};

export default AccountSettingsCardOne;