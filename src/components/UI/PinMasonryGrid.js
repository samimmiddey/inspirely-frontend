import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Masonry } from '@mui/lab';
import PinCard from './PinCard';
import { useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import { pinValues } from '../../Redux/slices/pinSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const PinMasonryGrid = ({ posts, handleScroll }) => {
   const { user } = useSelector(authValues);
   const { scrollLoading, getScrolledPosts } = useSelector(pinValues);

   const theme = useTheme();
   const xlWidth = useMediaQuery(theme.breakpoints.down('xl'));
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const xxsWidth = useMediaQuery(theme.breakpoints.down(350));

   const columns = xlWidth && !mdWidth && !smWidth && !xxsWidth ? 4 :
      xlWidth && mdWidth && !smWidth && !xxsWidth ? 3 :
         xlWidth && mdWidth && smWidth && !xxsWidth ? 2 :
            xlWidth && mdWidth && smWidth && xxsWidth ? 1 : 5;

   return (
      <Box
         sx={{
            width: '100%',
            height: '100%',
            marginBottom: '-1rem'
         }}
      >
         <InfiniteScroll
            dataLength={posts.length}
            next={handleScroll}
            hasMore={getScrolledPosts}
            scrollThreshold={1}
         >
            <Masonry
               columns={columns}
               spacing={smWidth ? 1.5 : 2}
               sx={{ margin: 0 }}
            >
               {posts.map((data, index) => (
                  <Box
                     key={index}
                     component={motion.div}
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        duration: 0.5,
                        ease: [0.6, 0.01, -0.05, 0.95],
                        delay: index >= 20 ? Math.round(index % (Math.floor(index / 20) * 20)) * 0.1 : index * 0.1
                     }}
                  >
                     <PinCard
                        data={data}
                        smWidth={smWidth}
                        user={user}
                     />
                  </Box>
               ))}
            </Masonry>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '50px', alignItems: 'center' }}>
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
                     All pins are loaded!
                  </Typography>
               }
            </Box>
         </InfiniteScroll>
      </Box>
   );
};

export default PinMasonryGrid;