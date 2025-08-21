import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pinValues } from '../../Redux/slices/pinSlice';
import { loadOnScroll } from '../../Redux/slices/pinThunks';
import PinMasonryGrid from '../UI/PinMasonryGrid';

const HomeFeed = ({ posts }) => {
   const { allPins } = useSelector(pinValues);

   const dispatch = useDispatch();

   // Load more pins on scroll
   const handleScroll = () => {
      dispatch(loadOnScroll());
   };

   return (
      <>
         <PinMasonryGrid
            posts={allPins.length >= 1 ? allPins : posts}
            handleScroll={handleScroll}
         />
      </>
   );
};

export default HomeFeed;