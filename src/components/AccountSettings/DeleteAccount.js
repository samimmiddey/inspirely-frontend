import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authValues, setAuthErrorText } from '../../Redux/slices/authSlice';
import ButtonProgress from '../UI/ButtonProgress';
import CustomButton from '../UI/CustomButton';
import CustomTextfield from '../UI/CustomTextfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import { deleteAccount } from '../../Redux/slices/authThunks';
import { uiValues } from '../../Redux/slices/uiSlice';

const DeleteAccount = ({ mdWidth, user }) => {
   const { authLoading } = useSelector(authValues);
   const { darkMode } = useSelector(uiValues);
   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      oldEmail: Yup.string()
         .required('Email is required')
         .email('Email is invalid')
         .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
      oldPassword: Yup.string()
         .required('Password is required')
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'Password must not exceed 50 characters')
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase')
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

   const fields = [
      {
         label: 'Enter old email address',
         name: 'oldEmail',
         type: 'email',
         placeholder: `Enter old email`
      },
      {
         label: 'Enter old password',
         name: 'oldPassword',
         type: 'password',
         placeholder: 'Enter old password'
      }
   ]

   // Handle Update Field
   const handleDeleteAccount = (data) => {
      if (data.oldEmail !== user.email) {
         dispatch(setAuthErrorText("You need to enter the email address correclty!"));
      } else {
         dispatch(deleteAccount(data, user.id));
      }
   };

   if (user.email === 'Signed in with Google' || user.email === 'Signed in with Facebook') {
      return (
         <Typography
            sx={theme => ({
               color: 'text.disabled',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '15px'
               }
            })}
         >
            You are {user.email.toLowerCase()}, therefore you are not allowed to delete the account.
         </Typography>
      );
   };

   return (
      <form style={{ width: '100%' }} onSubmit={handleSubmit((data) => handleDeleteAccount(data))}>
         <Typography
            sx={theme => ({
               color: 'primary.main',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '15px'
               }
            })}
         >
            A friendly reminder that you can&apos;t undo this process. Once you delete the account, it is permanently deleted. If you want to keep using the service, you need to create an account again.
         </Typography>
         <Box
            sx={theme => ({
               width: '100%',
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
            {
               fields.map((item, index) => (
                  <Box
                     key={index}
                     sx={{ width: '100%' }}
                  >
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
                        placeholder={item.placeholder}
                        autoComplete='new-password'
                     />
                  </Box>
               ))
            }
            <Box sx={{ marginTop: '2px' }} />
            <Box sx={{ width: '144px' }}>
               <CustomButton
                  background={!authLoading && 'primary.main'}
                  color='#fff'
                  type='submit'
                  loading={authLoading}
               >
                  {authLoading ? <ButtonProgress /> : 'Delete Account'}
               </CustomButton>
            </Box>
         </Box>
      </form>
   );
};

export default DeleteAccount;