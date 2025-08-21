import { Box, Checkbox, Typography } from '@mui/material';
import CustomButton from '../UI/CustomButton';
import AuthFields from './AuthFields';
import { useSelector, useDispatch } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signIn } from '../../Redux/slices/authThunks';
import ButtonProgress from '../UI/ButtonProgress';
import { useState } from 'react';
import Link from 'next/link';
import { uiValues } from '../../Redux/slices/uiSlice';

const fields = [
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
   }
];

const defaultValues = {
   email: '',
   password: ''
};

const Login = ({ mdWidth }) => {
   const [rememberMe, setRememberMe] = useState(false);
   const { authLoading } = useSelector(authValues);
   const { darkMode } = useSelector(uiValues);
   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid')
         .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
      password: Yup.string()
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
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValues
   });

   // Handle Signin
   const handleSignin = (data) => {
      dispatch(signIn(data, rememberMe));
      setRememberMe(false);
   };

   return (
      <form style={{ width: '100%' }} onSubmit={handleSubmit((data) => handleSignin(data))}>
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
            <AuthFields
               fields={fields}
               mdWidth={mdWidth}
               register={register}
               errors={errors}
            />
            <Box
               sx={theme => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  [theme.breakpoints.down(350)]: {
                     flexDirection: 'column'
                  }
               })}
            >
               <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-10px' }}>
                  <Checkbox
                     onClick={event => setRememberMe(event.target.checked)}
                     size='small'
                     color='secondary'
                  />
                  <Typography
                     sx={{
                        fontSize: '14px',
                        color: darkMode ? '#afacb9' : '#6d6a7c',
                        fontWeight: 500
                     }}
                  >
                     Remember me
                  </Typography>
               </Box>
               <Link href='/auth/reset-password'>
                  <Typography
                     sx={theme => ({
                        fontSize: '14px',
                        color: darkMode ? '#446dc1' : '#3366cc',
                        fontWeight: 500,
                        cursor: 'pointer',
                        [theme.breakpoints.down(350)]: {
                           marginBottom: '10px'
                        }
                     })}
                  >
                     Forgot Password
                  </Typography>
               </Link>
            </Box>
            <CustomButton
               background={!authLoading && 'primary.main'}
               color='#fff'
               type='submit'
               loading={authLoading}
            >
               {authLoading ? <ButtonProgress /> : 'Sign in'}
            </CustomButton>
         </Box>
      </form>
   );
};

export default Login;