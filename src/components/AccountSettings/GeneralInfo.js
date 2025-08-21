import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomTextfield from '../UI/CustomTextfield';
import { useDispatch, useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import { uiValues } from '../../Redux/slices/uiSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CustomButton from '../UI/CustomButton';
import ButtonProgress from '../UI/ButtonProgress';
import { setUserData } from '../../Redux/slices/authThunks';

const GeneralInfo = ({ user, mdWidth }) => {
   const { addUserDataLoading } = useSelector(authValues);
   const { darkMode } = useSelector(uiValues);
   const dispatch = useDispatch();

   const userData = [
      {
         label: 'Name',
         value: user.name,
         name: 'name',
         type: 'text',
         placeholder: 'Enter name'
      },
      {
         label: 'Address',
         value: user.address || '',
         name: 'address',
         type: 'text',
         placeholder: 'Enter address'
      },
      {
         label: 'About',
         value: user.about || '',
         name: 'about',
         type: 'text',
         placeholder: 'Write about yourself'
      },
      {
         label: 'Phone Number',
         value: user.phone || '',
         name: 'phone',
         type: 'number',
         placeholder: 'Enter phone number'
      },
      {
         label: 'Website',
         value: user.website || '',
         name: 'website',
         type: 'text',
         placeholder: 'Enter website url'
      }
   ];

   const validationSchema = Yup.object().shape({
      name: Yup.string()
         .required('Name is required')
         .min(2, 'Name must be at least 2 characters')
         .max(100, 'Name must not exceed 100 characters')
         .matches(/^\s*([A-Za-z]{1,}([.,] |[-']| ))+[A-Za-z]+.?\s*$/, 'Please enter a valid full name'),
      address: Yup.string()
         .required('Address is required')
         .matches(/^[a-zA-Z0-9\s-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]{2,200}$/gi, 'Plase enter a valid address'),
      about: Yup.string()
         .required('Description is required')
         .min(10, 'Description must be at least 10 characters')
         .max(200, 'Description must not exceed 200 characters')
         .matches(/^[a-zA-Z0-9\s-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]{10,200}$/gi, 'Please enter a valid description'),
      phone: Yup.string()
         .required('Phone number is required')
         .matches(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/, 'Please enter a valid phone number'),
      website: Yup.string()
         .required('Website is required')
         .matches(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi, 'Please enter a valid website url'),
   });

   const {
      register,
      handleSubmit,
      formState: {
         errors
      }
   } = useForm({
      resolver: yupResolver(validationSchema)
   });

   // Handle Update Data
   const handleUpdateData = (data) => {
      dispatch(setUserData(data, user.id));
   };

   return (
      <form style={{ width: '100%' }} onSubmit={handleSubmit((data) => handleUpdateData(data))}>
         <Box
            sx={theme => ({
               marginTop: '1rem',
               display: 'flex',
               flexDirection: 'column',
               rowGap: '12px',
               alignItems: 'flex-start',
               justifyContent: 'flex-start',
               width: '100%',
               [theme.breakpoints.down('xl')]: {
                  marginTop: '10px',
               },
               [theme.breakpoints.down('sm')]: {
                  marginTop: '5px'
               }
            })}
         >
            {userData.map((item, index) => (
               <Box key={index} sx={{ width: '100%' }}>
                  <Typography
                     sx={theme => ({
                        fontSize: '15px',
                        color: darkMode ? '#afacb9' : '#6d6a7c',
                        fontWeight: 500,
                        marginBottom: '4px',
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '14px'
                        }
                     })}
                  >
                     {item.label}
                  </Typography>
                  <CustomTextfield
                     height={mdWidth ? '8px' : '12px'}
                     name={item.name}
                     type={item.type}
                     borderRadius='8px'
                     register={register}
                     errors={errors}
                     defaultValue={item.value}
                     placeholder={item.placeholder}
                     rows={item.label === 'About' ? 4 : ''}
                  />
               </Box>
            ))}
            <Box sx={{ marginTop: '2px' }} />
            <Box sx={{ width: '120px' }}>
               <CustomButton
                  background={!addUserDataLoading && 'primary.main'}
                  color='#fff'
                  type='submit'
                  loading={addUserDataLoading}
               >
                  {addUserDataLoading ? <ButtonProgress /> : 'Update Info'}
               </CustomButton>
            </Box>
         </Box>
      </form>
   );
};

export default GeneralInfo;