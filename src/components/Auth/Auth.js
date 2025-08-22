import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import AuthCard from './AuthCard';
import AuthMenu from './AuthMenu';
import AuthErrorModal from './AuthErrorModal';
import CustomSnackbar from '../UI/CustomSnackbar';
import Image from 'next/image';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import Spinner from '../UI/Spinner';

const mainContainerStyle = {
   minHeight: '100vh',
   width: '100vw',
   position: 'relative'
};

const overlayStyle = {
   position: 'absolute',
   height: '100%',
   width: '100%',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   zIndex: 99
};

const authCardContainerStyle = {
   minHeight: '100vh',
   minWidth: '100vw',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
};

const pathnames = ['/auth/login', '/auth/signup', '/auth/reset-password'];

const Auth = () => {
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

         {/* Masonry Grid */}
         {/* <MasonryGrid images={images} /> */}
         <Box sx={{ height: '100vh', width: '100vw', position: 'fixed' }}>
            <Image
               src='/auth.png'
               layout='fill'
               objectFit='cover'
               alt='Auth'
            />
         </Box>

         {/* Overlay */}
         <Box sx={overlayStyle} />

         {/* Auth Cards Container */}
         <Box sx={authCardContainerStyle}>

            {/* Auth Menu */}
            {router.pathname === '/auth' && <AuthMenu />}

            {/* Auth Card */}
            {pathnames.includes(router.pathname) && <AuthCard />}

         </Box>

         <AuthErrorModal />
         <CustomSnackbar />
      </Box>
   );
};

export default Auth;