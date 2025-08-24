import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import CustomButton from '../../components/UI/CustomButton';
import AuthFields from '../../components/Auth/AuthFields';
import { useSelector, useDispatch } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signIn } from '../../Redux/slices/authThunks';
import ButtonProgress from '../../components/UI/ButtonProgress';
import Link from 'next/link';

const fieldsContainerStyle = theme => ({
   marginTop: '2rem',
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   alignItems: 'flex-start',
   justifyContent: 'flex-start',
   width: '100%',
   [theme.breakpoints.down('xl')]: {
      marginTop: '1.5rem',
      gap: '10px'
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '1.25rem'
   }
});

const formCheckContainerStyle = theme => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '1rem',
   width: '100%',
   [theme.breakpoints.down(350)]: {
      flexDirection: 'column'
   }
});

const rememberTextStyle = theme => ({
   fontSize: '14px',
   color: 'text.primary',
   fontWeight: 500,
   [theme.breakpoints.down('xl')]: {
      fontSize: '13px'
   }
});

const forgotTextStyle = theme => ({
   fontSize: '14px',
   color: 'primary.main',
   fontWeight: 500,
   cursor: 'pointer',
   [theme.breakpoints.down('xl')]: {
      fontSize: '13px'
   },
   [theme.breakpoints.down(350)]: {
      marginBottom: '10px'
   }
});

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

const LoginForm = () => {
   const [rememberMe, setRememberMe] = useState(false);
   const { authLoading } = useSelector(authValues);
   const dispatch = useDispatch();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

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
         <Box sx={fieldsContainerStyle}>
            <AuthFields
               fields={fields}
               mdWidth={mdWidth}
               register={register}
               errors={errors}
            />
            <Box sx={formCheckContainerStyle}>
               <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-10px' }}>
                  <Checkbox
                     onClick={event => setRememberMe(event.target.checked)}
                     size='small'
                     color='secondary'
                  />
                  <Typography sx={rememberTextStyle}>Remember me</Typography>
               </Box>
               <Link href='/auth/reset-password'>
                  <Typography sx={forgotTextStyle}>Forgot Password</Typography>
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

export default LoginForm;