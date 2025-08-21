import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import MasonryGrid from '../UI/MasonryGrid';
import AuthCard from './AuthCard';
import AuthMenu from './AuthMenu';
import Spinner from '../UI/Spinner';
import { authValues } from '../../Redux/slices/authSlice';
import { useSelector } from 'react-redux';
import AuthErrorModal from './AuthErrorModal';
import CustomSnackbar from '../UI/CustomSnackbar';
import { client } from '../../Client/client';

const Auth = () => {
   const { user } = useSelector(authValues);
   const [images, setImages] = useState([]);
   const [loading, setLoading] = useState(true);

   const router = useRouter();

   useEffect(() => {
      if (user) {
         router.replace('/');
      }
      if (router.pathname === '/auth' && !user) {
         const fetchData = async () => {
            const query = `*[_type == "auth"] | order(_createdAt asc) [0...30] {
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

   if (loading) {
      return <Spinner />;
   };

   return (
      <Box
         sx={{
            minHeight: '100vh',
            width: '100vw',
            position: 'relative'
         }}
      >
         {/* Masonry Grid */}
         <MasonryGrid images={images} />
         {/* Overlay */}
         <Box
            sx={{
               position: 'absolute',
               height: '100%',
               width: '100%',
               backgroundColor: 'rgba(0, 0, 0, 0.5)',
               zIndex: 99
            }}
         />
         <Box
            sx={{
               minHeight: '100vh',
               minWidth: '100vw',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
            }}
         >
            {/* Auth Menu */}
            {router.pathname === '/auth' && <AuthMenu />}
            {/* Auth Card */}
            {(router.pathname === '/auth/login' || router.pathname === '/auth/signup' || router.pathname === '/auth/reset-password') && <AuthCard />}
         </Box>
         <AuthErrorModal />
         <CustomSnackbar />
      </Box>
   );
};

export default Auth;