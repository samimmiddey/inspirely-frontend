import Typography from "@mui/material/Typography";

const PrimaryHeader = ({ text, color }) => {
   return (
      <Typography
         variant='h2'
         sx={theme => ({
            color: color || 'text.primary',
            fontSize: '2.25rem',
            fontWeight: 700,
            textAlign: 'center',
            [theme.breakpoints.down('xl')]: {
               fontSize: '1.75rem'
            },
            [theme.breakpoints.down('sm')]: {
               fontSize: '1.65rem'
            }
         })}
      >
         {text}
      </Typography>
   );
};

export default PrimaryHeader;