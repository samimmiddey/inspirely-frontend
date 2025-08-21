import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { HiCamera } from 'react-icons/hi';
import CustomIconButton from '../UI/CustomIconButton';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import CustomButton from '../UI/CustomButton';
import ButtonProgress from '../UI/ButtonProgress';

const UploadPicture = ({
   user,
   register,
   errors,
   imageURL,
   setImageURL,
   imageFile,
   setImageFile,
   darkMode,
   smWidth,
   getValues,
   reset,
   uploadPicLoading
}) => {
   return (
      <>
         <Box
            sx={{
               padding: '3px',
               borderRadius: '50%',
               backgroundColor: 'primary.main',
               position: 'relative'
            }}
         >
            <Box
               sx={{
                  padding: '3px',
                  borderRadius: '50%',
                  backgroundColor: darkMode ? '#99a0b2' : '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
               }}
            >
               {
                  imageURL ? (
                     <Image
                        src={imageURL}
                        alt=''
                        height={smWidth ? 70 : 90}
                        width={smWidth ? 70 : 90}
                        objectFit='cover'
                        quality={50}
                        style={{ borderRadius: '50%' }}
                     />
                  ) : (
                     <Image
                        src={user.photoURL ? user.photoURL : '/avatar.png'}
                        alt=''
                        height={smWidth ? 70 : 90}
                        width={smWidth ? 70 : 90}
                        objectFit='cover'
                        quality={50}
                        style={{ borderRadius: '50%' }}
                     />
                  )
               }
            </Box>
            <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
               {
                  imageURL ? (
                     <Tooltip title='Remove' placement='right'>
                        <Box
                           onClick={() => {
                              const values = getValues();
                              setImageFile(null);
                              setImageURL(null);
                              reset({ ...values, image: null });
                           }}
                        >
                           <CustomIconButton
                              dimension={30}
                              background='primary.main'
                              component='label'
                           >
                              <MdDelete style={{ fontSize: '1.25rem', color: '#fff' }} />
                           </CustomIconButton>
                        </Box>
                     </Tooltip>
                  ) : (
                     <Tooltip title='Upload' placement='right'>
                        <Box>
                           <CustomIconButton
                              dimension={30}
                              background='primary.main'
                              component='label'
                           >
                              <HiCamera style={{ color: '#fff', fontSize: '1.25rem' }} />
                              <input
                                 name='image'
                                 hidden
                                 accept="image/*"
                                 type="file"
                                 {...register('image', {
                                    onChange: e => {
                                       setImageFile(e.target.files[0]);
                                       setImageURL(URL.createObjectURL(e.target.files[0]))
                                    }
                                 })}
                              />
                           </CustomIconButton>
                        </Box>
                     </Tooltip>
                  )
               }
            </Box>
         </Box>
         {
            imageFile && !errors['image'] &&
            <Box
               sx={{
                  margin: '8px 0 -8px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
               }}
            >
               <Typography
                  className='text-wrap'
                  sx={theme => ({
                     color: 'text.primary',
                     fontSize: '12px',
                     fontWeight: 600,
                     maxWidth: '250px',
                     marginBottom: '2px',
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
                  {imageFile.name}
               </Typography>
               <Box sx={{ width: '81px' }}>
                  <CustomButton
                     background={!uploadPicLoading && 'primary.main'}
                     height='20px'
                     fontSize='12px'
                     borderRadius='5px'
                     color='#fff'
                     type='submit'
                     loading={uploadPicLoading}
                  >
                     {uploadPicLoading ? <ButtonProgress height={12} width={12} /> : 'Upload'}
                  </CustomButton>
               </Box>
            </Box>
         }
         {
            errors['image'] &&
            <Typography
               sx={{
                  margin: '8px 0 -8px 0',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'primary.main'
               }}
            >
               {errors['image']?.message}
            </Typography>
         }
      </>
   );
};

export default UploadPicture;