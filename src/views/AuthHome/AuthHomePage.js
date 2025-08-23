import AuthLayout from '../../components/Auth/AuthLayout';
import MasonryGrid from '../../components/UI/MasonryGrid';
import Box from '@mui/material/Box';
import AuthHomeMenu from './AuthHomeMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthImageAnimate, uiValues } from '../../Redux/slices/uiSlice';
import { useEffect } from 'react';

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

const AuthHomePage = ({ images }) => {
   const { authImageAnimate } = useSelector(uiValues);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!authImageAnimate) {
         dispatch(setAuthImageAnimate(true));
      }
   }, [authImageAnimate, dispatch]);

   return (
      <AuthLayout>
         {/* Masonry Grid */}
         <MasonryGrid
            images={images}
            hasAnimated={authImageAnimate}
         />

         {/* Overlay */}
         <Box sx={overlayStyle} />

         {/* Auth Cards Container */}
         <Box sx={authCardContainerStyle}>
            <AuthHomeMenu />
         </Box>
      </AuthLayout>
   );
};

export default AuthHomePage;