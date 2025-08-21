import React from 'react';
import { TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const StandardTextfield = (
   {
      placeholder,
      name,
      type,
      register,
      errors,
      rows,
      fontSize
   }
) => {
   const { darkMode } = useSelector(uiValues);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <>
         <TextField
            variant='standard'
            placeholder={placeholder}
            type={type}
            name={name}
            multiline={rows ? true : false}
            rows={rows}
            {...register(name, { required: true })}
            error={errors[name] ? true : false}
            sx={{
               width: '100%',
               backgroundColor: darkMode ? '#2c303a' : '#F8F9F9',
               '& .MuiInput-underline:after': {
                  borderBottomColor: '#3366cc',
               },
               '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                     borderColor: 'rgba(0, 0, 0, 0.18)',
                  },
                  '&:hover fieldset': {
                     borderColor: 'rgba(0, 0, 0, 0.18)'
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: '#3366cc',
                  },
               },
            }}
            inputProps={{
               style: {
                  margin: '5px 0',
                  fontSize: smWidth && name === 'title' ? '24px' : smWidth && name !== 'title' ? '14px' : fontSize,
                  fontWeight: 500
               }
            }}
         />
         <Typography
            sx={{
               textAlign: 'start',
               fontSize: '13px',
               marginTop: '4px',
               fontWeight: 600,
               color: 'primary.main'
            }}>
            {errors[name]?.message}
         </Typography>
      </>
   );
};

export default StandardTextfield;