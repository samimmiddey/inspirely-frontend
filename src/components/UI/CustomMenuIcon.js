import React from 'react';
import { Tooltip, Box } from '@mui/material';
import CustomIconButton from './CustomIconButton';

const CustomMenuIcon = ({ title, sx, children }) => {
   return (
      <Tooltip
         title={title}
         arrow
         sx={sx}
         placement='bottom'
      >
         <Box>
            <CustomIconButton>
               {children}
            </CustomIconButton>
         </Box>
      </Tooltip>
   );
};

export default CustomMenuIcon;