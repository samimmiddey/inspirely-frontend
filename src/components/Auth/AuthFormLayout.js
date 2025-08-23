import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthLayout from '../../components/Auth/AuthLayout';
import AuthCardLayout from '../../components/Auth/AuthCardLayout';
import Image from 'next/image';

const containerStyle = theme => ({
   height: '100%',
   width: '100%',
   padding: '10px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   [theme.breakpoints.down('md')]: {
      padding: 0
   }
});

const gridStyle = theme => ({
   display: 'grid',
   gridTemplateColumns: '7fr 5fr',
   height: '100%',
   width: '100%',
   [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'none',
      position: 'relative',
      minHeight: '100vh',
      height: '100%'
   }
});

const imgContainerStyle = theme => ({
   position: 'relative',
   minHeight: 'calc(100vh - 20px)',
   borderRadius: '30px',
   overflow: 'hidden',
   [theme.breakpoints.down('xl')]: {
      borderRadius: '20px'
   },
   [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: '100%',
      height: '100%',
      width: '100%',
      borderRadius: 0
   }
});

const gridTextStyle = theme => ({
   position: 'absolute',
   left: 0,
   right: 0,
   bottom: 0,
   padding: '3rem 3rem 4.5rem 3rem',
   zIndex: 11,
   [theme.breakpoints.down('xl')]: {
      padding: '2.5rem 2.5rem 3rem 2.5rem'
   },
   [theme.breakpoints.down('md')]: {
      position: 'relative',
      padding: '6rem 0 2rem 0',
      maxWidth: '550px',
      width: '100%',
      margin: '0 auto'
   },
   [theme.breakpoints.down('sm')]: {
      padding: '6rem 24px 2rem 24px'
   }
});

const mainTextStyle = theme => ({
   fontSize: '6rem',
   fontWeight: 700,
   color: 'text.white',
   lineHeight: 1,
   [theme.breakpoints.down('xl')]: {
      fontSize: '4.5rem'
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '3rem'
   }
});

const AuthFormLayout = ({ children, title, text }) => {
   return (
      <AuthLayout>
         <Box sx={containerStyle}>
            <Box sx={gridStyle}>
               <Box sx={imgContainerStyle} className='login-img-container'>
                  <Image
                     src='/auth.jpg'
                     layout='fill'
                     alt=''
                     objectFit='cover'
                     quality={50}
                  />
                  <Box sx={gridTextStyle}>
                     <Typography variant='h1' sx={mainTextStyle}>
                        Find.<br />Save.<br />Inspire.
                     </Typography>
                  </Box>
               </Box>
               <AuthCardLayout
                  title={title}
                  text={text}
               >
                  {children}
               </AuthCardLayout>
            </Box>
         </Box>
      </AuthLayout>
   );
};

export default AuthFormLayout;