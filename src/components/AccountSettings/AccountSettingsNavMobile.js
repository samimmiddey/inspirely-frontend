import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { navElements } from '../Data/data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GeneralInfo from './GeneralInfo';
import UpdateInfo from './UpdateInfo';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const AccountSettingsNavMobile = ({ settingsID, mdWidth, user }) => {
   const { darkMode } = useSelector(uiValues);
   const [expanded, setExpanded] = React.useState(settingsID);

   const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
   };

   return (
      <Box>
         {
            navElements.map((item, index) => (
               <Accordion
                  key={index}
                  square
                  disableGutters
                  onChange={handleChange(item.text.toLowerCase().replace(' ', '-'))}
                  expanded={expanded === item.text.toLowerCase().replace(' ', '-')}
                  elevation={0}
                  TransitionProps={{ unmountOnExit: true }}
                  sx={{
                     width: '100%',
                     backgroundColor: settingsID === item.text.toLowerCase().replace(' ', '-') && !darkMode ? '#E5E7E9' :
                        settingsID === item.text.toLowerCase().replace(' ', '-') && darkMode ? '#373c49' : '#F8F9F9',
                     // padding: '2px 0'
                  }}
               >
                  <Link href={`/account-settings/${item.text.toLowerCase().replace(' ', '-')}`}>
                     <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ backgroundColor: darkMode ? '#2c303a' : '#F8F9F9' }}
                     >
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              columnGap: '1.5rem',
                              color: settingsID === item.text.toLowerCase().replace(' ', '-') ? 'text.primary' : 'text.secondary'
                           }}
                        >
                           {item.icon}
                           <Typography style={{ fontSize: '15px', fontWeight: 500 }}>
                              {item.text}
                           </Typography>
                        </Box>
                     </AccordionSummary>
                  </Link>
                  <AccordionDetails sx={{ marginBottom: '10px' }}>
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
                  </AccordionDetails>
               </Accordion>
            ))
         }
      </Box>
   );
};

export default AccountSettingsNavMobile;