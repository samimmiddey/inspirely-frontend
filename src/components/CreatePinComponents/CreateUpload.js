import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { RiUploadCloud2Line } from 'react-icons/ri';
import CustomIconButton from '../UI/CustomIconButton';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const CreateUpload = ({ name, imageFile, setImageFile, register, errors, reset, getValues }) => {
   const { darkMode } = useSelector(uiValues);
   return (
      <>
         {
            imageFile ? (
               <Box
                  sx={theme => ({
                     height: 'max-content',
                     width: '100%',
                     margin: 'auto',
                     backgroundColor: darkMode ? '#21242c' : '#F2F3F4',
                     borderRadius: '20px',
                     padding: '1.5rem',
                     [theme.breakpoints.down('md')]: {
                        maxWidth: '325px'
                     },
                     [theme.breakpoints.down('sm')]: {
                        maxWidth: '300px',
                        padding: '1rem'
                     }
                  })}
               >
                  <Box
                     className='pin-card-image-container'
                     sx={{ width: '100%', position: 'relative' }}
                  >
                     <Image
                        className='pin-card-image'
                        src={imageFile}
                        alt=''
                        layout='fill'
                        objectFit='contain'
                     // style={{ borderRadius: '20px' }}
                     />
                     <Box sx={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                        <Tooltip title='Remove'>
                           <Box
                              onClick={() => {
                                 const values = getValues();
                                 setImageFile(null);
                                 reset({ ...values, image: null })
                              }}
                           >
                              <CustomIconButton background='#e6e6e6' dimension={35}>
                                 <MdDelete style={{ fontSize: '1.3rem', color: '#545260' }} />
                              </CustomIconButton>
                           </Box>
                        </Tooltip>
                     </Box>
                  </Box>
               </Box>
            ) : (
               <Box
                  component="label"
                  sx={theme => ({
                     height: '100%',
                     width: '100%',
                     backgroundColor: darkMode ? '#21242c' : '#F2F3F4',
                     borderRadius: '20px',
                     padding: '1.5rem',
                     cursor: !imageFile && 'pointer',
                     [theme.breakpoints.down('md')]: {
                        height: '400px',
                        maxWidth: '325px',
                        margin: '0 auto'
                     },
                     [theme.breakpoints.down('sm')]: {
                        maxWidth: '300px',
                        padding: '1rem',
                        height: '375px'
                     },
                     [theme.breakpoints.down(350)]: {
                        height: '350px'
                     }
                  })}
               >
                  <Box
                     sx={{
                        borderRadius: '20px',
                        height: '100%',
                        border: `1px dashed ${errors[name] && !darkMode ? '#e60023' : errors[name] && darkMode ? '#d3223d' : !errors[name] && !darkMode ? 'rgba(0, 0, 0, 0.18)' : 'rgba(255, 255, 255, 0.18)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '0 1.5rem'
                     }}
                  >
                     <RiUploadCloud2Line style={{ fontSize: '1.5rem', color: '#868395' }} />
                     <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                        Click to upload
                     </Typography>
                     <Typography
                        sx={{
                           fontWeight: 500,
                           color: 'text.disabled',
                           fontSize: '14px',
                           textAlign: 'center',
                           marginTop: '8rem'
                        }}
                     >
                        Use high quality JPG, PNG, SVG & GIF file less than 20 MB
                     </Typography>
                  </Box>
                  <input
                     name={name}
                     hidden
                     accept="image/*"
                     multiple
                     type="file"
                     {...register(name, {
                        required: true,
                        onChange: e => setImageFile(URL.createObjectURL(e.target.files[0]))
                     })}
                  />
                  <Typography
                     sx={{
                        textAlign: 'center',
                        fontSize: '13px',
                        marginTop: '2px',
                        fontWeight: 600,
                        color: 'primary.main'
                     }}
                  >
                     {errors[name]?.message}
                  </Typography>
               </Box>
            )
         }
      </>
   );
};

export default CreateUpload;