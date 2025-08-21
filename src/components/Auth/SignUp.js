import React from 'react';
import { Box } from '@mui/material';
import AuthFields from './AuthFields';
import CustomButton from '../UI/CustomButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signUp } from '../../Redux/slices/authThunks';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import ButtonProgress from '../UI/ButtonProgress';

const fields = [
   {
      label: 'Name',
      placeholder: 'Enter Your Name',
      name: 'name',
      type: 'text'
   },
   {
      label: 'Email',
      placeholder: 'Enter Your Email',
      name: 'email',
      type: 'email'
   },
   {
      label: 'Password',
      placeholder: 'Enter Your Password',
      name: 'password',
      type: 'password'
   },
   {
      label: 'Confirm Password',
      placeholder: 'Re-enter Your Password',
      name: 'confirmPassword',
      type: 'password'
   }
];

const defaultValues = {
   name: '',
   email: '',
   password: ''
};

const SignUp = ({ mdWidth }) => {
   const { authLoading } = useSelector(authValues);
   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      name: Yup.string()
         .required('Name is required')
         .min(2, 'Name must be at least 2 characters')
         .max(100, 'Name must not exceed 100 characters')
         .matches(/^\s*([A-Za-z]{1,}([.,] |[-']| ))+[A-Za-z]+.?\s*$/, 'Please enter a valid full name'),
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid')
         .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
      password: Yup.string()
         .required('Password is required')
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'Password must not exceed 50 characters')
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase'),
      confirmPassword: Yup.string()
         .required('Please re-enter your password')
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'Password must not exceed 50 characters')
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one digit, one uppercase & one lowercase')
         .oneOf([Yup.ref('password')], 'Password does not match')
   });

   const {
      register,
      handleSubmit,
      formState: {
         errors
      }
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValues
   });

   // Handle Signup
   const handleSignup = (data) => {
      dispatch(signUp(data));
   };


   return (
      <form
         style={{ width: '100%' }}
         onSubmit={handleSubmit((data) => handleSignup(data))}
      >
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
                  marginTop: '5px',
                  rowGap: '10px'
               }
            })}
         >
            <AuthFields
               fields={fields}
               mdWidth={mdWidth}
               register={register}
               errors={errors}
            />
            <Box sx={{ marginTop: '2px' }} />
            <CustomButton
               background={!authLoading && 'primary.main'}
               color='#fff'
               type='submit'
               loading={authLoading}
            >
               {authLoading ? <ButtonProgress /> : 'Sign up'}
            </CustomButton>
         </Box>
      </form>
   );
};

export default SignUp;