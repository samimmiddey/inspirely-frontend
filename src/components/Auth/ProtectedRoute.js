import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import { useRouter } from 'next/router';
import Auth from './Auth';
import { useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';

const ProtectedRoute = ({ children }) => {
   const { user } = useSelector(authValues);
   const [redirecting, setRedirecting] = useState(true);
   const router = useRouter();

   useEffect(() => {
      if (!user && !router.pathname.startsWith("/auth")) {
         router.replace("/auth");
      } else if (user && router.pathname.startsWith("/auth")) {
         router.replace("/");
      } else {
         setRedirecting(false);
      }
   }, [user, router]);

   if (redirecting) return <Spinner />;

   return (
      <>
         {user ? children : <Auth />}
      </>
   );
};

export default ProtectedRoute;