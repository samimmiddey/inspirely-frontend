import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { pinValues } from '../../Redux/slices/pinSlice';
import ActionList from '../UI/ActionList';
import PinDetailsCard from '../UI/PinDetailsCard';
import ShareModal from '../UI/ShareModal';

const PinDetails = ({ pin }) => {
   const { singlePin } = useSelector(pinValues);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   const mainPin = Object.keys(singlePin).length === 0 ? pin : singlePin;

   return (
      <>
         <PinDetailsCard
            pin={mainPin}
            smWidth={smWidth}
            mdWidth={mdWidth}
         />
         <ActionList
            list={['Download Image', 'Share Image']}
            pin={mainPin}
         />
         <ShareModal url={`inspirelyhub.vercel.app/pin-details/${pin._id}`} />
      </>
   );
};

export default PinDetails;