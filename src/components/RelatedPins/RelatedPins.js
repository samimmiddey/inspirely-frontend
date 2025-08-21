import React from 'react';
import { Box, Typography } from '@mui/material';
import PinMasonryGrid from '../UI/PinMasonryGrid';
import { useDispatch, useSelector } from 'react-redux';
import { pinValues } from '../../Redux/slices/pinSlice';
import { loadOnScroll } from '../../Redux/slices/pinThunks';

const RelatedPins = ({ pins, pinCategory }) => {
   const { allPins, singlePin } = useSelector(pinValues);
   const dispatch = useDispatch();

   const filteredRelatedPins = allPins.filter(pin => pin._id != singlePin._id);

   // Load more pins on scroll
   const handleScroll = () => {
      dispatch(loadOnScroll(pinCategory));
   };

   return (
      <Box sx={{ marginTop: '4rem' }}>
         <Typography
            sx={{
               textAlign: 'center',
               fontSize: '1.25rem',
               color: 'text.primary',
               fontWeight: 600,
               marginBottom: '1.5rem'
            }}
         >
            {filteredRelatedPins.length === 0 ? 'No related pins found' : 'More pins like this'}
         </Typography>
         {
            filteredRelatedPins.length !== 0 &&
            <PinMasonryGrid
               posts={allPins.length >= 1 ? filteredRelatedPins : pins}
               handleScroll={handleScroll}
            />
         }
      </Box>
   );
};

export default RelatedPins;