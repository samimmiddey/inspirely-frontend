import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import AuthErrorModal from './AuthErrorModal';
import CustomSnackbar from '../UI/CustomSnackbar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import Spinner from '../UI/Spinner';

const mainContainerStyle = {
   minHeight: '100vh',
   width: '100%',
   position: 'relative'
};

const AuthLayout = ({ children }) => {
   const { user } = useSelector(authValues);
   const router = useRouter();

   useEffect(() => {
      if (user) {
         router.replace('/');
      }
   }, [user, router]);

   if (user) {
      return <Spinner />;
   };

   return (
      <Box sx={mainContainerStyle}>
         {children}
         <AuthErrorModal />
         <CustomSnackbar />
      </Box>
   );
};

export default AuthLayout;