import React from 'react';
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Link from 'next/link';
import { navElements } from '../Data/data';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const AccountSettingsNav = ({ settingsID }) => {
   const { darkMode } = useSelector(uiValues);

   return (
      <Box>
         {
            navElements.map((item, index) => (
               <Link
                  key={index}
                  href={`/account-settings/${item.text.toLowerCase().replace(' ', '-')}`}
               >
                  <ListItemButton
                     disableRipple
                     sx={{
                        px: 1,
                        justifyContent: 'initial',
                        backgroundColor: settingsID === item.text.toLowerCase().replace(' ', '-') ? (darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)') : '',
                        '&:hover': {
                           backgroundColor: settingsID === item.text.toLowerCase().replace(' ', '-') ? (darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)') : ''
                        }
                     }}
                  >
                     <ListItemIcon
                        sx={{
                           color: settingsID === item.text.toLowerCase().replace(' ', '-') ? 'text.primary' : 'text.secondary',
                           mr: 1,
                           justifyContent: 'center',
                        }}
                     >
                        {item.icon}
                     </ListItemIcon>
                     <ListItemText
                        primary={
                           <Typography style={{ fontSize: '15px', fontWeight: 500 }}>
                              {item.text}
                           </Typography>
                        }
                        sx={{ color: settingsID === item.text.toLowerCase().replace(' ', '-') ? 'text.primary' : 'text.secondary' }}
                     />
                  </ListItemButton>
               </Link>
            ))
         }
      </Box>
   );
};

export default AccountSettingsNav;