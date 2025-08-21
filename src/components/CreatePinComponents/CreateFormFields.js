import React from 'react';
import { Box, Typography } from '@mui/material';
import StandardTextfield from '../UI/StandardTextfield';
import CustomSelectBox from '../UI/CustomSelectBox';
import { categories } from '../Data/data';
import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import Image from 'next/image';
import CustomButton from '../UI/CustomButton';
import ButtonProgress from '../UI/ButtonProgress';
import { uiValues } from '../../Redux/slices/uiSlice';
import { pinValues } from '../../Redux/slices/pinSlice';
import Link from 'next/link';

const CreateFormFields = ({ fields, categoryValue, setCategoryValue, register, errors }) => {
   const { user } = useSelector(authValues);
   const { buttonLoading } = useSelector(uiValues);
   const { isUploaded } = useSelector(pinValues);

   const updatedCategories = categories.filter(category => category.text !== 'Home');

   return (
      <Box
         sx={theme => ({
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            [theme.breakpoints.down('sm')]: {
               rowGap: '10px'
            }
         })}
      >
         {
            fields.map((field, index) => (
               <Box
                  key={index}
                  sx={{ width: '100%' }}
               >
                  <StandardTextfield
                     placeholder={field.placeholder}
                     name={field.name}
                     type={field.type}
                     register={register}
                     errors={errors}
                     rows={field.name === 'about' ? 3 : 0}
                     fontSize={field.name === 'title' ? '32px' : '15px'}
                  />
               </Box>
            ))
         }
         <CustomSelectBox
            title='Category'
            name='category'
            categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}
            categories={updatedCategories}
            register={register}
            errors={errors}
         />
         <Box
            sx={theme => ({
               display: 'flex',
               alignItems: 'center',
               columnGap: '8px',
               marginTop: '10px',
               [theme.breakpoints.down('sm')]: {
                  marginTop: '5px'
               }
            })}
         >
            <Link href={`/profile/${user.id}`}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     height: '32px',
                     width: '32px',
                     borderRadius: '50%'
                  }}
               >
                  <Image
                     src={user.photoURL || '/avatar.png'}
                     alt=''
                     height={32}
                     width={32}
                     style={{ borderRadius: '50%', cursor: 'pointer' }}
                     objectFit='cover'
                  />
               </Box>
            </Link>
            <Link href={`/profile/${user.id}`}>
               <Box
                  sx={{
                     position: 'relative',
                     width: '90%',
                     display: 'flex',
                     alignItems: 'center'
                  }}
               >
                  <Typography
                     className='text-wrap'
                     sx={{
                        fontSize: '14px',
                        position: 'absolute',
                        maxWidth: '100%',
                        fontWeight: 500,
                        cursor: 'pointer'
                     }}
                  >
                     {user.name}
                  </Typography>
               </Box>
            </Link>
         </Box>
         <Box
            sx={theme => ({
               marginTop: '1rem',
               [theme.breakpoints.down('sm')]: {
                  marginTop: '10px'
               }
            })}
         >
            <CustomButton
               background={!buttonLoading && 'primary.main'}
               color='#fff'
               type='submit'
               loading={buttonLoading || isUploaded}
            >
               {(buttonLoading || isUploaded) ? <ButtonProgress /> : 'Upload'}
            </CustomButton>
         </Box>
      </Box>
   );
};

export default CreateFormFields;