import React, { useEffect } from 'react';
import Auth from './Auth';
import { useSelector, useDispatch } from 'react-redux';
import { authValues, setUser } from '../../Redux/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import Spinner from '../UI/Spinner';
import Router from 'next/router';
import { getUserData } from '../../Redux/slices/authThunks';

const ProtectedRoute = ({ children }) => {
   const { user, onSignUpLoading, getUserDataLoading } = useSelector(authValues);
   const dispatch = useDispatch();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            dispatch(getUserData(user.uid));
         } else {
            dispatch(setUser(null));
            Router.replace('/auth');
         }
      });

      return () => unsubscribe();
   }, [dispatch]);

   if (getUserDataLoading || onSignUpLoading) {
      return <Spinner />;
   };

   return (
      <>
         {user ? children : <Auth />}
      </>
   );
};

export default ProtectedRoute;