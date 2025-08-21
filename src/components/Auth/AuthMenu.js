import { Fragment } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CustomButton from '../UI/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithFacebook, signInWithGoogle } from '../../Redux/slices/authThunks';
import { uiValues } from '../../Redux/slices/uiSlice';

const buttons = [
   {
      text: 'Continue with email',
      background: 'primary.main',
      color: '#fff'
   },
   {
      text: 'Continue with Google',
      background: '#F8F9F9',
      color: '#6d6a7c'
   },
   {
      text: 'Continue with Facebook',
      background: '#F8F9F9',
      color: '#6d6a7c'
   }
];

const AuthMenu = () => {
   const { darkMode } = useSelector(uiValues);

   const dispatch = useDispatch();

   const theme = useTheme();
   const xxsWidth = useMediaQuery(theme.breakpoints.down(350));

   return (
      <Box
         className='authmenu-card'
         sx={theme => ({
            maxWidth: '450px',
            width: '100%',
            zIndex: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '2.5rem 2.5rem 2.75rem 2.5rem',
            [theme.breakpoints.down('xl')]: {
               padding: '2rem 2rem 2.5rem 2rem'
            },
            [theme.breakpoints.down('sm')]: {
               width: '80%',
               padding: '1.5rem 1.5rem 2rem 1.5rem'
            },
            [theme.breakpoints.down('xs')]: {
               width: '85%'
            },
            [theme.breakpoints.down(350)]: {
               width: '90%'
            }
         })}
      >
         <Box
            sx={{
               height: '50px',
               width: '100%',
               display: 'flex',
               justifyContent: 'center'
            }}
         >
            <Image
               src='/logo.png'
               alt='logo'
               height={50}
               width={150}
               objectFit='contain'
            />
         </Box>
         <Typography
            variant='h2'
            sx={theme => ({
               color: '#fff',
               fontSize: '2rem',
               fontWeight: 700,
               textAlign: 'center',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1.75rem'
               },
               [theme.breakpoints.down(350)]: {
                  marginTop: 0
               }
            })}
         >
            Welcome to Inspirely
         </Typography>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               gap: '10px',
               marginTop: '20px',
               width: '100%'
            }}
         >
            {
               buttons.map((item, index) => (
                  <Fragment key={index}>
                     {
                        item.text === 'Continue with email' ? (
                           <Link href='/auth/login'>
                              <Box>
                                 <CustomButton
                                    background={item.background}
                                    color={item.color}
                                 >
                                    <Typography variant='body1' sx={{ fontSize: '15px' }}>{item.text}</Typography>
                                 </CustomButton>
                              </Box>
                           </Link>
                        ) : (
                           <Box onClick={() => {
                              if (item.text === 'Continue with Google') {
                                 dispatch(signInWithGoogle());
                              } else {
                                 dispatch(signInWithFacebook());
                              }
                           }}>
                              <CustomButton
                                 background={darkMode ? '#373c49' : item.background}
                                 color={item.color}
                              >
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       justifyContent: 'center',
                                       columnGap: '10px',
                                       color: 'text.primary'
                                    }}
                                 >
                                    {
                                       !xxsWidth &&
                                       <Image
                                          src={index === 1 ? '/google.png' : '/facebook.png'}
                                          height={30}
                                          width={30}
                                          alt=''
                                       />
                                    }
                                    <Typography variant='body1' sx={{ fontSize: '15px' }}>{item.text}</Typography>
                                 </Box>
                              </CustomButton>
                           </Box>
                        )
                     }
                  </Fragment>
               ))
            }
         </Box>
      </Box >
   );
};

export default AuthMenu;