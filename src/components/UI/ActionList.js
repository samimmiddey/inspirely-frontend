import React from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActionAnchorEl, setShareAnchorEl, uiValues } from '../../Redux/slices/uiSlice';
import { useState } from 'react';

const ActionList = ({ list, pin }) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const { actionAnchorEl } = useSelector(uiValues);
   const dispatch = useDispatch();

   const open = Boolean(actionAnchorEl);

   const handleClose = () => {
      dispatch(setActionAnchorEl(null));
      setSelectedIndex(0);
   };

   return (
      <Menu
         anchorEl={actionAnchorEl}
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
                        onClick={e => dispatch(setShareAnchorEl(e.currentTarget))}
                        selected={index === selectedIndex}
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

export default ActionList;