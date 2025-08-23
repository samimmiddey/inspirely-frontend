import Button from '@mui/material/Button';

const CustomButton = ({ children, background, color, border, type, loading, height, borderRadius, variant, fontSize }) => {
   return (
      <Button
         disableElevation
         variant={variant ? variant : 'contained'}
         type={type}
         disabled={loading}
         sx={theme => ({
            minWidth: 0,
            minHeight: 0,
            padding: '0 20px',
            height: height ? height : '46px',
            textTransform: 'none',
            color: color,
            width: '100%',
            borderRadius: borderRadius ? borderRadius : '8px',
            border: border,
            backgroundColor: background,
            fontSize: fontSize ? fontSize : '15px',
            '&:hover': {
               backgroundColor: background
            },
            [theme.breakpoints.down('xl')]: {
               height: height ? height : '42px',
               fontSize: '14px'
            }
         })}
      >
         {children}
      </Button>
   );
};

export default CustomButton;