import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import { setTabValue } from '../../Redux/slices/pinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const StyledTabs = styled((props) => (
   <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
   />
))(({ darkmode }) => ({
   '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      height: '3px'
   },
   '& .MuiTabs-indicatorSpan': {
      maxWidth: '60%',
      width: '100%',
      backgroundColor: darkmode === 'true' ? '#9391a1' : '#302f37'
   }
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ darkmode }) => ({
   textTransform: 'none',
   fontWeight: 600,
   fontSize: '15px',
   color: darkmode === 'true' ? '#afacb9' : 'text.secondary',
   '&.Mui-selected': {
      color: darkmode === 'true' ? '#bcbac4' : 'text.primary',
   },
   '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
   }
}));

const CustomTabs = ({ value, labelOne, labelTwo }) => {
   const { darkMode } = useSelector(uiValues);
   const dispatch = useDispatch();

   const handleChange = (event, newValue) => {
      dispatch(setTabValue(newValue));
   };

   return (
      <Box
         sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
         }}
      >
         <StyledTabs
            value={value}
            onChange={handleChange}
            textColor='inherit'
            darkmode={darkMode.toString()}
         >
            <StyledTab
               value='one'
               label={labelOne}
               darkmode={darkMode.toString()}
            />
            <StyledTab
               value='two'
               label={labelTwo}
               darkmode={darkMode.toString()}
            />
         </StyledTabs>
      </Box>
   );
};

export default CustomTabs;