import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextfield from '../UI/CustomTextfield';

const labelStyle = theme => ({
   fontSize: '15px',
   color: 'text.primary',
   fontWeight: 500,
   marginBottom: '4px',
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   }
});

const AuthFields = ({ fields, mdWidth, register, errors }) => {
   return (
      <>
         {
            fields.map((field, index) => (
               <Box key={index} sx={{ width: '100%' }}>
                  <Typography sx={labelStyle}>{field.label}</Typography>
                  <CustomTextfield
                     key={index}
                     height={mdWidth ? '8px' : '11px'}
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