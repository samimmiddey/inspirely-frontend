import { useState } from 'react';
import { IconButton, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const CustomTextfield = (
   {
      height,
      placeholder,
      name,
      type,
      borderRadius,
      register,
      errors,
      defaultValue,
      rows,
      autoComplete
   }
) => {
   const { darkMode } = useSelector(uiValues);
   const [showPassword, setShowPassword] = useState(false);

   const theme = useTheme();
   const xlWidth = useMediaQuery(theme.breakpoints.down('xl'));

   const handlePasswordVisibility = () => {
      setShowPassword(prevState => !prevState);
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <>
         <TextField
            variant='outlined'
            placeholder={placeholder}
            defaultValue={defaultValue || ''}
            name={name}
            multiline={rows ? true : false}
            rows={rows}
            autoComplete={autoComplete}
            type={showPassword ? 'text' : type}
            {...register(name, { required: true })}
            error={errors[name] ? true : false}
            sx={{
               width: '100%',
               backgroundColor: darkMode ? '#2c303a' : '#F8F9F9',
               borderRadius: borderRadius,
               '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                     borderColor: darkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.18)',
                     borderRadius: borderRadius
                  },
                  '&:hover fieldset': {
                     borderColor: darkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.18)'
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'secondary.main'
                  }
               }
            }}
            inputProps={{
               style: {
                  height: !rows && height,
                  margin: '0 3px',
                  fontSize: xlWidth ? '14px' : '15px',
                  fontWeight: 400
               }
            }}
            InputProps={{
               endAdornment: (
                  type === 'password' &&
                  <InputAdornment position='end'>
                     <IconButton
                        size='small'
                        onClick={handlePasswordVisibility}
                        onMouseDown={handleMouseDownPassword}
                     >
                        {
                           showPassword ?
                              <BsFillEyeSlashFill
                                 style={{
                                    color: '#a19fad',
                                    cursor: 'pointer',
                                    fontSize: '1.3rem'
                                 }}
                              /> :
                              <BsFillEyeFill
                                 style={{
                                    color: '#a19fad',
                                    cursor: 'pointer',
                                    fontSize: '1.3rem'
                                 }}
                              />
                        }
                     </IconButton>
                  </InputAdornment>
               )
            }}
         />
         <Typography
            sx={{
               textAlign: 'start',
               fontSize: '14px',
               marginTop: '4px',
               fontWeight: 400,
               color: 'primary.main'
            }}>
            {errors[name]?.message}
         </Typography>
      </>
   );
};

export default CustomTextfield;