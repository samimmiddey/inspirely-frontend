import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authValues, setUser } from '../../Redux/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import Spinner from '../UI/Spinner';
import { useRouter } from 'next/router';
import { getUserData } from '../../Redux/slices/authThunks';

const ProtectedRoute = ({ children }) => {
   const { user, onSignUpLoading, getUserDataLoading } = useSelector(authValues);
   const [authInitLoading, setAuthInitLoading] = useState(true);

   const router = useRouter();
   const dispatch = useDispatch();

   // Check auth state
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
         if (loggedInUser) {
            dispatch(getUserData(loggedInUser.uid)).finally(() => {
               setAuthInitLoading(false);
            });
         } else {
            dispatch(setUser(null));
            setAuthInitLoading(false);
         }
      });

      return () => unsubscribe();
   }, [dispatch]);

   // Redirect logic
   useEffect(() => {
      if (authInitLoading || getUserDataLoading || onSignUpLoading) return;

      if (user && router.pathname.startsWith('/auth')) {
         router.replace('/');
      }
      if (!user && !router.pathname.startsWith('/auth')) {
         router.replace('/auth');
      }
   }, [authInitLoading, getUserDataLoading, onSignUpLoading, user, router]);

   // Show spinner while loading or redirecting
   if (authInitLoading || getUserDataLoading || onSignUpLoading) {
      return <Spinner />;
   }

   // Render children if user is logged in or on /auth pages
   // Allow auth pages to render
   if (!user && router.pathname.startsWith('/auth')) {
      return <>{children}</>;
   }

   // Allow protected pages for logged-in users
   if (user && !router.pathname.startsWith('/auth')) {
      return <>{children}</>;
   }

   // Fallback for redirects
   return <Spinner />;
};

export default ProtectedRoute;