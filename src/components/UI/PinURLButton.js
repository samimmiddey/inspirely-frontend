import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const PinURLButton = ({ url, maxWidth, padding, iconSize, textSize }) => {
   const { selected, selectedShareButton } = useSelector(uiValues);

   const customizedURL = url.replace(/^https?:\/\//, '');

   const finalURL = customizedURL.substring(customizedURL.indexOf('.') + 1);

   const theme = useTheme();
   const xsWidth = useMediaQuery(theme.breakpoints.down('xs'));

   return (
      <a
         className={selected || selectedShareButton ? 'text-wrap' : 'destination-button text-wrap'}
         href={url}
         target='_blank'
         rel='noreferrer'
         onClick={e => e.stopPropagation()}
         style={{
            display: xsWidth ? 'none' : 'flex',
            alignItems: 'center',
            maxWidth: maxWidth,
            padding: padding,
            backgroundColor: '#F8F9F9',
            borderRadius: '50px',
            columnGap: '2px',
            height: '32px'
         }}
      >
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowOutwardIcon sx={{ fontSize: iconSize, color: 'text.primary' }} />
         </Box>
         <Typography
            className='text-wrap'
            sx={theme => ({
               fontSize: textSize,
               fontWeight: 600,
               color: 'text.primary',
               [theme.breakpoints.down('xl')]: {
                  fontSize: '12px'
               }
            })}
         >
            {finalURL}
         </Typography>
      </a>
   );
};

export default PinURLButton;