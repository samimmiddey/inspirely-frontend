import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import CustomHeader from '../UI/CustomHeader';
import AccountSettingsCardOne from './AccountSettingsCardOne';
import AccountSettingsCardTwo from './AccountSettingsCardTwo';

const AccountSettings = () => {
   const { user, verifyEmailLoading } = useSelector(authValues);

   const router = useRouter();
   const { settingsID } = router.query;

   const params = !settingsID ? 'general-info' : settingsID;

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Box>
         <CustomHeader text='Account Settings' />
         <Grid
            container
            sx={theme => ({
               paddingTop: '2rem',
               [theme.breakpoints.down('md')]: {
                  paddingTop: '1.5rem'
               }
            })}
            spacing={3}
         >
            <Grid item x={12} md={4}>
               <AccountSettingsCardOne
                  user={user}
                  settingsID={params}
                  verifyEmailLoading={verifyEmailLoading}
                  mdWidth={mdWidth}
                  smWidth={smWidth}
               />
            </Grid>
            {!mdWidth &&
               <Grid item x={12} md={8}>
                  <AccountSettingsCardTwo
                     user={user}
                     settingsID={params}
                  />
               </Grid>
            }
         </Grid>
      </Box>
   );
};

export default AccountSettings;