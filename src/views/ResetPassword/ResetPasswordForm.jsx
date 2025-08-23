import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import CustomButton from '../../components/UI/CustomButton';
import AuthFields from '../../components/Auth/AuthFields';
import { useSelector, useDispatch } from 'react-redux';
import { authValues, setResetPasswordEmailSent } from '../../Redux/slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonProgress from '../../components/UI/ButtonProgress';
import { useEffect } from 'react';
import { resetPassword } from '../../Redux/slices/authThunks';

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

const fields = [
   {
      label: 'Email',
      placeholder: 'Enter Your Email',
      name: 'email',
      type: 'email'
   },
];

const defaultValues = {
   email: ''
};

const ResetPasswordForm = () => {
   const { authLoading, resetPasswordEmailSent } = useSelector(authValues);
   const dispatch = useDispatch();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid')
         .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address')
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

   // Handle Reset Password
   const handleResetPassword = (data) => {
      dispatch(resetPassword(data));
   };

   useEffect(() => {
      if (resetPasswordEmailSent) {
         Router.push('/auth/login');
         dispatch(setResetPasswordEmailSent(false));
      }
   }, [resetPasswordEmailSent, dispatch]);

   return (
      <form
         style={{ width: '100%' }}
         onSubmit={handleSubmit((data) => handleResetPassword(data))}
      >
         <Box sx={fieldsContainerStyle}>
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
               {authLoading ? <ButtonProgress /> : 'Reset Password'}
            </CustomButton>
         </Box>
      </form>
   );
};

export default ResetPasswordForm;