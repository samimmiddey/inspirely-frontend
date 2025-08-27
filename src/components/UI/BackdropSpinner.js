import { Backdrop } from '@mui/material';
import SpinnerCircle from './SpinnerCircle';

const BackdropSpinner = ({ value }) => {
   return (
      <Backdrop
         sx={{
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: (theme) => theme.zIndex.drawer + 1
         }}
         open={value}
      >
         <SpinnerCircle />
      </Backdrop>
   );
};

export default BackdropSpinner;