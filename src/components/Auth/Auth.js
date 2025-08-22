import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import AuthCard from './AuthCard';
import AuthMenu from './AuthMenu';
import AuthErrorModal from './AuthErrorModal';
import CustomSnackbar from '../UI/CustomSnackbar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import Spinner from '../UI/Spinner';
import { client } from '../../Client/client';
import MasonryGrid from '../UI/MasonryGrid';

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
   const [images, setImages] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (user) {
         router.replace('/');
      }
      if (router.pathname.startsWith('/auth') && !user) {
         const fetchData = async () => {
            const query = `*[_type == "auth"] | order(_createdAt asc) [0...21] {
               title,
               image{
                 asset->{
                   url
                 }
               },
            }`;

            const posts = await client.fetch(query);

            setImages(posts);
            setLoading(false);
         };

         fetchData();
      }
   }, [user, router]);

   if (user || loading) {
      return <Spinner />;
   };

   return (
      <Box sx={mainContainerStyle}>

         {/* Masonry Grid */}
         <MasonryGrid images={images} />

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