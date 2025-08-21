import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';
import CustomTextfield from '../UI/CustomTextfield';

const AuthFields = ({ fields, mdWidth, register, errors }) => {
   const { darkMode } = useSelector(uiValues);

   return (
      <>
         {
            fields.map((field, index) => (
               <Box
                  key={index}
                  sx={{ width: '100%' }}
               >
                  <Typography
                     sx={theme => ({
                        fontSize: '15px',
                        color: darkMode ? '#afacb9' : '#6d6a7c',
                        fontWeight: 500,
                        marginBottom: '4px',
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '14px'
                        }
                     })}
                  >
                     {field.label}
                  </Typography>
                  <CustomTextfield
                     key={index}
                     height={mdWidth ? '8px' : '12px'}
                     placeholder={field.placeholder}
                     name={field.name}
                     type={field.type}
                     borderRadius='8px'
                     register={register}
                     errors={errors}
                  />
               </Box>
            ))
         }
      </>
   );
};

export default AuthFields;