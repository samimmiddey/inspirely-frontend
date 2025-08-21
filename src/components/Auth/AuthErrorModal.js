import { Backdrop, Box, Card, Typography, useMediaQuery, useTheme } from '@mui/material';
import { authValues, setAuthErrorText } from '../../Redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../UI/CustomButton';
import Image from 'next/image';

const AuthErrorModal = () => {
   const { authErrorText } = useSelector(authValues);

   const dispatch = useDispatch();

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <>
         <Backdrop
            onClick={() => dispatch(setAuthErrorText(null))}
            open={authErrorText ? true : false}
            sx={{ zIndex: 9999999, backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
         />
         <Card
            elevation={0}
            sx={theme => ({
               display: authErrorText ? 'flex' : 'none',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               position: 'fixed',
               top: '50%',
               left: '50%',
               transform: 'translateY(-50%) translateX(-50%)',
               maxWidth: '400px',
               width: '100%',
               zIndex: 99999999,
               padding: '2.75rem 2rem 2.45rem 2rem',
               boxShadow: 'rgb(90 114 123 / 11%) 0px 5px 20px 0px',
               [theme.breakpoints.down('sm')]: {
                  padding: '2rem 1.5rem'
               },
               [theme.breakpoints.down('xs')]: {
                  maxWidth: '90%'
               }
            })}
         >
            <Image
               src={'/error.png'}
               alt='error logo'
               height={smWidth ? 75 : 96}
               width={smWidth ? 75 : 96}
            />
            <Typography
               sx={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'text.primary'
               }}
            >
               Oops!
            </Typography>
            <Typography
               sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  margin: '8px 0 20px 0',
                  textAlign: 'center'
               }}
            >
               {authErrorText}
            </Typography>
            <Box
               sx={{ width: '100%' }}
               onClick={() => dispatch(setAuthErrorText(null))}
            >
               <CustomButton
                  background='#e60023'
                  color='#fff'
                  border='none'
                  type='button'
               >
                  Dismiss
               </CustomButton>
            </Box>
         </Card>
      </>
   );
};

export default AuthErrorModal;