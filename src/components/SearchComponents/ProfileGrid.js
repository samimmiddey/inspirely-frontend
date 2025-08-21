import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { pinValues } from '../../Redux/slices/pinSlice';
import ProfileCard from '../UI/ProfileCard';

const ProfileGrid = ({ users, handleScroll }) => {
   const { scrollLoading, getScrolledPosts } = useSelector(pinValues);

   return (
      <Box
         sx={{
            width: '100%',
            height: '100%'
         }}
      >
         <InfiniteScroll
            dataLength={users.length}
            next={handleScroll}
            hasMore={getScrolledPosts}
            scrollThreshold={1}
         >
            <Box
               sx={theme => ({
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1.5rem',
                  [theme.breakpoints.down('lg')]: {
                     gridTemplateColumns: 'repeat(3, 1fr)'
                  },
                  [theme.breakpoints.down('md')]: {
                     gridTemplateColumns: 'repeat(2, 1fr)'
                  },
                  [theme.breakpoints.down('xs')]: {
                     gridTemplateColumns: '1fr'
                  }
               })}
            >
               {
                  users.map((user, index) => (
                     <ProfileCard
                        key={index}
                        userData={user}
                     />
                  ))
               }
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100px', alignItems: 'center' }}>
               {
                  scrollLoading &&
                  <CircularProgress size={35} />
               }
               {
                  !getScrolledPosts && !scrollLoading &&
                  <Typography
                     sx={{
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: 'text.primary'
                     }}
                  >
                     All users are loaded!
                  </Typography>
               }
            </Box>
         </InfiniteScroll>
      </Box>
   );
};

export default ProfileGrid;