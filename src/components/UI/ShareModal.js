import React from 'react';
import { Box, Divider, Menu, Typography } from '@mui/material';
import {
   FacebookShareButton,
   LinkedinShareButton,
   TelegramShareButton,
   TwitterShareButton,
   WhatsappShareButton,
   TwitterIcon,
   FacebookIcon,
   TelegramIcon,
   WhatsappIcon,
   LinkedinIcon
} from "react-share";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCopy, AiOutlineCopy } from 'react-icons/ai';
import { setSelectedShareButton, setShareAnchorEl, setSnackbar, toggleSnackbar, uiValues } from '../../Redux/slices/uiSlice';
import { useState } from 'react';
import { TiTimes } from 'react-icons/ti';

const ShareModal = ({ url }) => {
   const [copied, setCopied] = useState(false);
   const { shareAnchorEl, selectedShareButton } = useSelector(uiValues);
   const open = Boolean(shareAnchorEl);

   const dispatch = useDispatch();

   const handleClose = () => {
      dispatch(setShareAnchorEl(null));
      setCopied(false);

      if (selectedShareButton) {
         dispatch(setSelectedShareButton(false));
      }
   }

   return (
      <Menu
         anchorEl={shareAnchorEl}
         open={open}
         onClose={handleClose}
         MenuListProps={{
            'aria-labelledby': 'basic-button',
         }}
         transformOrigin={{ horizontal: 'center', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
         PaperProps={{
            sx: {
               padding: '0.5rem 1rem',
               marginTop: '8px',
               borderRadius: '15px'
            }
         }}
      >
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
               sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  // fontSize: '14px'
               }}
            >
               Share
            </Typography>
            <TiTimes
               onClick={handleClose}
               style={{
                  fontSize: '1.25rem',
                  color: '#868395',
                  cursor: 'pointer'
               }}
            />
         </Box>
         <Divider sx={{ margin: '9px 0 14px 0' }} />
         <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '14px' }}>
            {
               [
                  <FacebookShareButton url={url} key='1'>
                     <FacebookIcon size={35} round={true} />
                  </FacebookShareButton>,
                  <TwitterShareButton url={url} key='2'>
                     <TwitterIcon size={35} round={true} />
                  </TwitterShareButton>,
                  <LinkedinShareButton url={url} key='3'>
                     <LinkedinIcon size={35} round={true} />
                  </LinkedinShareButton>,
                  <WhatsappShareButton url={url} key='4'>
                     <WhatsappIcon size={35} round={true} />
                  </WhatsappShareButton>,
                  <TelegramShareButton url={url} key='5'>
                     <TelegramIcon size={35} round={true} />
                  </TelegramShareButton>
               ].map((icon, index) => (
                  <Box key={index}>
                     {icon}
                  </Box>
               ))
            }
         </Box>
         <Box sx={{ marginTop: '8px' }}>
            <Typography
               sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '14px'
               }}
            >
               Copy link
            </Typography>
            <Box
               sx={{
                  paddingLeft: '8px',
                  marginTop: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.075)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '38px'
               }}
            >
               <Typography
                  className='text-wrap'
                  sx={{
                     maxWidth: '175px',
                     width: '100%',
                     fontSize: '14px'
                  }}
               >
                  {url}
               </Typography>
               <Box
                  onClick={() => {
                     !copied && navigator.clipboard.writeText(url)
                        .then(() => {
                           setCopied(true);
                           dispatch(toggleSnackbar());
                           dispatch(setSnackbar({ value: true, text: 'Linked copied successfully!' }));
                        })
                  }}
                  sx={{
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     height: '100%',
                     width: '40px'
                  }}
               >
                  {
                     !copied ?
                        <AiOutlineCopy
                           style={{
                              fontSize: '1.25rem',
                              color: '#868395',
                           }}
                        /> :
                        <AiFillCopy
                           style={{
                              fontSize: '1.25rem',
                              color: '#868395',
                           }}
                        />
                  }
               </Box>
            </Box>
         </Box>
      </Menu>
   );
};

export default ShareModal;