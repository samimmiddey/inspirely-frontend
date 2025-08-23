import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import CustomButton from "../../components/UI/CustomButton";
import PrimaryHeader from "../../components/UI/PrimaryHeader";

const buttons = [
   {
      text: 'Continue with email',
      background: 'primary.main',
      color: 'text.white'
   },
   {
      text: 'Continue with Google',
      background: 'bg.grey',
      color: 'text.primary'
   },
   {
      text: 'Continue with Facebook',
      background: 'bg.grey',
      color: 'text.primary'
   }
];

const menuCardStyle = theme => ({
   maxWidth: '450px',
   width: '100%',
   zIndex: 299,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '10px',
   padding: '2.75rem 2.5rem',
   [theme.breakpoints.down('xl')]: {
      padding: '2rem 2rem 2.25rem 2rem',
   },
   [theme.breakpoints.down('sm')]: {
      width: '80%',
      padding: '1.75rem 1.5rem'
   },
   [theme.breakpoints.down('xs')]: {
      width: '90%'
   }
});

const logoContainerStyle = theme => ({
   height: '32px',
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   position: 'relative',
   marginBottom: '0.25rem',
   [theme.breakpoints.down('xl')]: {
      height: '30px'
   },
   [theme.breakpoints.down('sm')]: {
      height: '24px'
   }
});

const btnContainerStyle = theme => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   marginTop: '20px',
   width: '100%',
   [theme.breakpoints.down('xl')]: {
      marginTop: '16px'
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '14px'
   }
});

const btnTextContainerStyle = {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   columnGap: '10px',
   color: 'text.primary'
};

const btnTextStyle = theme => ({
   fontSize: '15px',
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   }
});

const AuthHomeMenu = () => {
   const dispatch = useDispatch();

   const theme = useTheme();
   const xxsWidth = useMediaQuery(theme.breakpoints.down(350));

   return (
      <Box className='authmenu-card' sx={menuCardStyle}>
         <Box sx={logoContainerStyle}>
            <Image
               src='/logo.png'
               alt='logo'
               layout='fill'
               objectFit='contain'
            />
         </Box>
         <PrimaryHeader
            text='Welcome to Inspirely'
            color='text.white'
         />
         <Box sx={btnContainerStyle}>
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
                                    <Typography variant='body1' sx={btnTextStyle}>{item.text}</Typography>
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
                                 background={item.background}
                                 color={item.color}
                              >
                                 <Box sx={btnTextContainerStyle}>
                                    {
                                       !xxsWidth &&
                                       <Image
                                          src={index === 1 ? '/google.png' : '/facebook.png'}
                                          height={30}
                                          width={30}
                                          alt=''
                                       />
                                    }
                                    <Typography variant='body1' sx={btnTextStyle}>{item.text}</Typography>
                                 </Box>
                              </CustomButton>
                           </Box>
                        )
                     }
                  </Fragment>
               ))
            }
         </Box>
      </Box>
   );
};

export default AuthHomeMenu;