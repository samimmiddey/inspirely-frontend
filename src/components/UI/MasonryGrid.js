import React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Masonry } from '@mui/lab';
import { urlFor } from '../../Client/client';

const parent = {
   hidden: {
      opacity: 0
   },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1
      }
   }
}

const children = {
   hidden: {
      opacity: 0,
      y: 25
   },
   visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 1,
         ease: [0.6, 0.01, -0.05, 0.95]
      }
   }
}

const MasonryGrid = ({ images }) => {
   const theme = useTheme();
   const xlWidth = useMediaQuery(theme.breakpoints.down('xl'));
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const xssWidth = useMediaQuery(theme.breakpoints.down(350));

   const columns =
      xlWidth && !lgWidth && !mdWidth && !smWidth && !xssWidth ? 6 :
         xlWidth && lgWidth && !mdWidth && !smWidth && !xssWidth ? 5 :
            xlWidth && lgWidth && mdWidth && !smWidth && !xssWidth ? 4 :
               xlWidth && lgWidth && mdWidth && smWidth && !xssWidth ? 3 :
                  xlWidth && lgWidth && mdWidth && smWidth && xssWidth ? 2 : 7;

   return (
      <Box
         sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
         }}
      >
         <Masonry
            columns={columns}
            spacing={smWidth ? 0.5 : 1}
            component={motion.div}
            variants={parent}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            sx={theme => ({
               margin: 0,
               transform: 'scale(1.02)',
               [theme.breakpoints.down('sm')]: {
                  transform: 'scale(1)',
                  margin: '-1rem 0 0 0'
               }
            })}
         >
            {images.map((item, index) => (
               <Box
                  key={index}
                  component={motion.div}
                  variants={children}
                  viewport={{ once: true }}
               >
                  <Box sx={{ position: 'relative' }} className='pin-card-image-container'>
                     <Image
                        className='pin-card-image'
                        // loader={() => urlFor(item.image).width(200).url()}
                        src={urlFor(item.image).width(250).url()}
                        alt=''
                        layout='fill'
                        style={{ borderRadius: '15px' }}
                        quality={30}
                        priority
                        placeholder='blur'
                        blurDataURL={urlFor(item.image).url()}
                     />
                  </Box>
               </Box>
            ))}
         </Masonry>
      </Box>
   );
}

export default MasonryGrid;