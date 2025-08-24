import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
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