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
import '../styles/utility.css';
import '../styles/responsive.css';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { Box } from '@mui/material';
import { io } from "socket.io-client";
import { useEffect } from 'react';
import { setSocket, uiValues } from '../src/Redux/slices/uiSlice';
import { authValues } from '../src/Redux/slices/authSlice';

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
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
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