import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authValues, setUser } from '../../Redux/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import Spinner from '../UI/Spinner';
import { useRouter } from 'next/router';
import { getUserData } from '../../Redux/slices/authThunks';
import Auth from './Auth';

const ProtectedRoute = ({ children }) => {
   const { user, onSignUpLoading, getUserDataLoading } = useSelector(authValues);
   const [authInitLoading, setAuthInitLoading] = useState(true);

   const router = useRouter();
   const dispatch = useDispatch();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
         if (loggedInUser) {
            dispatch(getUserData(loggedInUser.uid)).finally(() => {
               setAuthInitLoading(false);
            });
            if (router.pathname.startsWith("/auth")) {
               router.replace("/");
            }
         } else {
            dispatch(setUser(null));
            if (!router.pathname.startsWith("/auth")) {
               router.replace("/auth");
            }
            setAuthInitLoading(false);
         }
      });

      return () => unsubscribe();
   }, [dispatch, router]);

   if (getUserDataLoading || onSignUpLoading || authInitLoading) {
      return <Spinner />;
   };

   return (
      <>
         {user ? children : <Auth />}
      </>
   );
};

export default ProtectedRoute;