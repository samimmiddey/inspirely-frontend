import React from 'react';
import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setInputFocus } from '../../Redux/slices/uiSlice';

const SearchBar = React.forwardRef(({ height, value, setValue, setSubmitted, darkMode }, ref) => {
   const dispatch = useDispatch();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   // Clear the input
   const handleClear = () => {
      ref.current.value = '';
      setValue('');
   };

   return (
      <Box
         sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 999999
         }}
      >
         <TextField
            placeholder='Search'
            inputRef={ref}
            onClick={() => setSubmitted(false)}
            onChange={e => setValue(e.target.value)}
            onBlur={() => dispatch(setInputFocus(false))}
            onFocus={() => dispatch(setInputFocus(true))}
            sx={{
               width: '100%',
               backgroundColor: darkMode ? '#2c303a' : '#E5E7E9',
               borderRadius: '50px',
               '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                     borderColor: 'transparent',
                     borderRadius: '50px'
                  },
                  '&:hover fieldset': {
                     borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: '#3366cc',
                     borderWidth: '2px'
                  }
               }
            }}
            inputProps={{
               style: {
                  height: height ? height : '15px',
                  marginLeft: mdWidth ? '2rem' : '2.75rem',
                  marginRight: mdWidth ? '2rem' : '2.75rem'
               }
            }}
         />
         <FiSearch
            style={{
               position: 'absolute',
               top: '50%',
               left: mdWidth ? '1rem' : '1.5rem',
               transform: 'translateY(-50%)',
               fontSize: '1.5rem',
               color: '#aeacb9'
            }}
         />
         {
            value &&
            <FaTimes
               onClick={handleClear}
               style={{
                  position: 'absolute',
                  top: '50%',
                  right: mdWidth ? '1rem' : '1.5rem',
                  transform: 'translateY(-50%)',
                  fontSize: '1.35rem',
                  color: '#aeacb9',
                  cursor: 'pointer'
               }}
            />
         }
      </Box>
   );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;