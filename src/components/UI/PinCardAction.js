import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPinCardActionAnchorEl, setSelected, uiValues } from '../../Redux/slices/uiSlice';
import { deletePin } from '../../Redux/slices/pinThunks';

const PinCardAction = ({ list, pin }) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const { pinCardActionAnchorEl } = useSelector(uiValues);
   const dispatch = useDispatch();

   const open = Boolean(pinCardActionAnchorEl);

   const handleClose = () => {
      dispatch(setPinCardActionAnchorEl(null));
      setSelectedIndex(0);
      dispatch(setSelected(false));
   };

   return (
      <Menu
         anchorEl={pinCardActionAnchorEl}
         open={open}
         onClose={handleClose}
         MenuListProps={{
            'aria-labelledby': 'basic-button',
         }}
         PaperProps={{
            sx: {
               borderRadius: '15px',
               padding: '1px'
            }
         }}
         transformOrigin={{ horizontal: 'center', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
         sx={{ marginTop: '8px' }}
      >
         {
            list.map((item, index) => (
               <Box
                  key={index}
                  onMouseOver={() => setSelectedIndex(index)}
               >
                  {item === 'Download Image' ? (
                     <a
                        href={`${pin.image?.asset?.url}?dl=`}
                        download
                     >
                        <MenuItem
                           key={index}
                           selected={index === selectedIndex}
                           onClick={handleClose}
                           sx={{
                              margin: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '15px',
                              fontWeight: 600
                           }}
                        >
                           {item}
                        </MenuItem>
                     </a>
                  ) : (
                     <MenuItem
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => {
                           dispatch(deletePin(pin._id));
                           handleClose();
                        }}
                        sx={{
                           margin: '2px 8px',
                           borderRadius: '10px',
                           fontSize: '15px',
                           fontWeight: 600
                        }}
                     >
                        {item}
                     </MenuItem>
                  )}
               </Box>
            ))
         }
      </Menu>
   );
};

export default PinCardAction;