import { Box, Card, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import GeneralInfo from './GeneralInfo';
import UpdateInfo from './UpdateInfo';

const AccountSettingsCardTwo = ({ user, settingsID }) => {
   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <Card className='card-padding' elevation={0}>
         <Typography sx={{ color: 'text.primary', fontSize: '1.25rem', fontWeight: 600 }}>
            {settingsID.replace('-', ' ').split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ')}
         </Typography>
         <Box sx={{ marginTop: '1rem' }}>
            {
               settingsID === 'general-info' ?
                  <GeneralInfo
                     user={user}
                     mdWidth={mdWidth}
                  /> :
                  <UpdateInfo
                     settingsID={settingsID}
                     mdWidth={mdWidth}
                     user={user}
                  />
            }
         </Box>
      </Card>
   );
};

export default AccountSettingsCardTwo;