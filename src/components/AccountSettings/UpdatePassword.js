import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authValues, setAuthErrorText } from '../../Redux/slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CustomTextfield from '../UI/CustomTextfield';
import CustomButton from '../UI/CustomButton';
import ButtonProgress from '../UI/ButtonProgress';
import { updateUserPassword } from '../../Redux/slices/authThunks';
import { uiValues } from '../../Redux/slices/uiSlice';

const UpdatePassword = ({ user, mdWidth }) => {
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
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase'),
      newPassword: Yup.string()
         .required('Password is required')
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'Password must not exceed 50 characters')
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase'),
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
      },
      {
         label: 'Enter new password',
         name: 'newPassword',
         type: 'password',
         placeholder: 'Enter new password'
      }
   ]

   // Handle Update Field
   const handleUpdatePassword = (data) => {
      if (data.oldEmail !== user.email) {
         dispatch(setAuthErrorText('You need to enter the email address correctly!'));
      } else if (data.oldPassword === data.newPassword) {
         dispatch(setAuthErrorText("You've entered the old password. You need to enter a new one!"));
      } else {
         dispatch(updateUserPassword(data));
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
            You are {user.email.toLowerCase()}, therefore you are not allowed to change the password.
         </Typography>
      );
   };

   return (
      <form style={{ width: '100%' }} onSubmit={handleSubmit((data) => handleUpdatePassword(data))}>
         <Typography
            sx={theme => ({
               color: 'text.disabled',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '15px'
               }
            })}
         >
            A friendly reminder that you can&apos;t undo this process. However, you can update your password anytime you want at your convenience.
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
            <Box sx={{ width: '160px' }}>
               <CustomButton
                  background={!authLoading && 'primary.main'}
                  color='#fff'
                  type='submit'
                  loading={authLoading}
               >
                  {authLoading ? <ButtonProgress /> : 'Update Password'}
               </CustomButton>
            </Box>
         </Box>
      </form>
   );
};

export default UpdatePassword;