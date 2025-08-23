import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavigateBackButton from '../UI/NavigateBackButton';
import Image from 'next/image';
import PrimaryHeader from '../UI/PrimaryHeader';

const backButtonStyle = theme => ({
   position: 'absolute',
   top: '40px',
   left: '40px',
   zIndex: 500,
   borderRadius: '50%',
   [theme.breakpoints.down('md')]: {
      top: '24px',
      left: '24px'
   }
});

const authCardStyle = theme => ({
   margin: '0 auto',
   maxWidth: '550px',
   width: '100%',
   padding: '3rem',
   zIndex: 200,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '1rem',
   [theme.breakpoints.down('xl')]: {
      padding: '2rem 3rem'
   },
   [theme.breakpoints.down('lg')]: {
      padding: '1.5rem 2rem'
   },
   [theme.breakpoints.down('md')]: {
      padding: '2rem 1.5rem',
      backgroundColor: 'bg.white',
      borderRadius: '15px',
      marginTop: '18rem',
      marginBottom: '5rem',
      height: 'max-content'
   },
   [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 32px)',
      padding: '2rem 1.25rem'
   }
});

const logoContainerStyle = theme => ({
   height: '30px',
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   position: 'relative',
   marginBottom: '0.25rem',
   [theme.breakpoints.down('xl')]: {
      height: '24px'
   },
   [theme.breakpoints.down('sm')]: {
      height: '20px'
   }
});

const subTextStyle = theme => ({
   color: 'text.secondary',
   fontSize: '1rem',
   textAlign: 'center',
   marginTop: '10px',
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   }
});

const bottomTextStyle = theme => ({
   fontSize: '16px',
   color: 'text.primary',
   fontWeight: 400,
   textAlign: 'center',
   marginTop: '0.5rem',
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   }
});

const bottomLinkStyle = {
   color: '#e60023',
   marginLeft: '5px',
   cursor: 'pointer',
   fontWeight: 500
};

const AuthCardLayout = ({ children, title, text }) => {
   const router = useRouter();

   const loginPath = router.pathname === '/auth/login';
   const signupPath = router.pathname === '/auth/signup';
   const path = loginPath ? 'signup' : 'login';

   return (
      <>
         {/* Back Button */}
         <Link href='/auth'>
            <Box sx={backButtonStyle}>
               <NavigateBackButton />
            </Box>
         </Link>

         {/* Auth Card */}
         <Box sx={authCardStyle}>

            {/* Logo */}
            <Box sx={logoContainerStyle}>
               <Image
                  src='/logo.png'
                  alt='logo'
                  layout='fill'
                  objectFit='contain'
               />
            </Box>

            {/* Form Content */}
            <Box sx={{ width: '100%' }}>
               <PrimaryHeader text={title} />
               <Typography sx={subTextStyle}>{text}</Typography>

               {/* Children */}
               {children}

            </Box>
            <Typography sx={bottomTextStyle}>
               {loginPath ? "Don't have an account?" : signupPath ? "Already have an account?" : 'Changed your mind?'}
               <Link href={`/auth/${path}`}>
                  <span style={bottomLinkStyle}>{loginPath ? 'Sign Up' : 'Login'}</span>
               </Link>
            </Typography>
         </Box>
      </>
   );
};

export default AuthCardLayout;