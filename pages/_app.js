import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import theme from '../src/MUI/theme';
import createEmotionCache from '../src/MUI/createEmotionCache';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../src/Redux/store';
import Layout from '../src/components/Layout/Layout';
import '../styles/globals.css';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { Box } from '@mui/material';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { setSocket, uiValues } from '../src/Redux/slices/uiSlice';
import { authValues, setUser } from '../src/Redux/slices/authSlice';
import Spinner from '../src/components/UI/Spinner';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../src/Redux/slices/authThunks';
import { auth } from '../src/Firebase/firebase';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Socket Component
const ExtraLayout = ({ children }) => {
   const { socket } = useSelector(uiValues);
   const { user } = useSelector(authValues);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setSocket(io("https://inspirelyhub.onrender.com")));
   }, [dispatch]);

   useEffect(() => {
      socket?.emit("newUser", user?.id);
   }, [socket, user]);

   return (
      <Box>{children}</Box>
   );
};

// Firebase on-load check
const FirebaseAuthCheck = ({ children }) => {
   const dispatch = useDispatch();
   const [authInitLoading, setAuthInitLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
         if (loggedInUser) {
            dispatch(getUserData(loggedInUser.uid)).finally(() =>
               setAuthInitLoading(false)
            );
         } else {
            dispatch(setUser(null));
            setAuthInitLoading(false);
         }
      });

      return () => unsubscribe();
   }, [dispatch]);

   // Load Spinner
   if (authInitLoading) {
      return <Spinner />;
   };

   return (
      <>{children}</>
   );
};

const MyApp = (props) => {
   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

   Router.events.on('routeChangeStart', () => {
      NProgress.start();
   });

   Router.events.on('routeChangeComplete', () => {
      NProgress.done();
   });

   Router.events.on('routeChangeError', () => {
      NProgress.done();
   });

   NProgress.configure({ showSpinner: false });

   return (
      <CacheProvider value={emotionCache}>
         <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <title>Inspirely</title>
         </Head>
         <ThemeProvider theme={theme}>
            <Provider store={store}>
               <ExtraLayout>
                  <FirebaseAuthCheck>
                     <Layout>
                        <Component {...pageProps} />
                     </Layout>
                  </FirebaseAuthCheck>
               </ExtraLayout>
            </Provider>
         </ThemeProvider>
      </CacheProvider>
   );
};

export default MyApp;

MyApp.propTypes = {
   Component: PropTypes.elementType.isRequired,
   emotionCache: PropTypes.object,
   pageProps: PropTypes.object.isRequired,
};