import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';
import Image from 'next/image';
import { useEffect } from 'react';

const topics = [
   { text: 'Coding', image: '/mason30.jpg' },
   { text: 'Travel', image: '/mason3.jpg' },
   { text: 'Fitness', image: '/mason7.jpg' },
   { text: 'Fashion', image: '/mason14.jpg' },
   { text: 'Christmas', image: '/mason13.jpg' },
   { text: 'Nature', image: '/mason6.jpg' },
   { text: 'Food', image: '/mason11.jpg' },
   { text: 'Abstract', image: '/mason27.jpg' }
];

const SearchPredictionModal = React.forwardRef(({ setValue, submitted, setSubmitted, terms, setTerms }, ref) => {
   const { inputFocus, darkMode } = useSelector(uiValues);

   useEffect(() => {
      if (typeof window !== "undefined") {
         if (localStorage.getItem('searchTerms')) {
            setTerms(JSON.parse(localStorage.getItem('searchTerms')));
         }
      }
   }, [setTerms]);

   return (
      <Card
         onClick={() => ref.current.focus()}
         className='card-padding'
         sx={theme => ({
            position: 'absolute',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            zIndex: 9999,
            borderRadius: '0 0 20px 20px',
            background: darkMode ? '#21242c' : '#F2F3F4',
            boxShadow: 'none',
            minHeight: '400px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            display: !inputFocus ? 'none' : 'flex',
            '&:hover': {
               display: !submitted && 'flex'
            },
            [theme.breakpoints.down('xl')]: {
               width: '100%'
            },
            [theme.breakpoints.down('md')]: {
               top: '50px',
               borderRadius: 0
            }
         })}
      >
         <Box sx={{ minHeight: '200px', width: '100%', marginBottom: '16px' }}>
            <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
               Recent searches
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '10px',
                  alignItems: 'flex-start'
               }}
            >
               {
                  terms.map((term, index) => (
                     <Box
                        key={index}
                        sx={{ width: '100%', position: 'relative' }}
                     >
                        <Button
                           onClick={() => {
                              ref.current.value = term;
                              setValue(term);
                              setSubmitted(true);
                           }}
                           disableElevation
                           disableRipple
                           type={submitted ? 'submit' : 'button'}
                           className='text-wrap'
                           sx={{
                              fontSize: '15px',
                              textTransform: 'none',
                              height: '35px',
                              width: '100%',
                              padding: '0 100px 0 16px',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              textAlign: 'start'
                           }}
                        >
                           {term}
                        </Button>
                        <Typography
                           onClick={() => {
                              const searchedTerms = JSON.parse(localStorage.getItem('searchTerms'));
                              const newArr = searchedTerms.filter(text => text !== term);
                              setTerms(newArr);
                              localStorage.setItem('searchTerms', JSON.stringify(newArr));
                           }}
                           sx={{
                              position: 'absolute',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              right: '20px',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'secondary.main',
                              cursor: 'pointer'
                           }}
                        >
                           Remove
                        </Typography>
                     </Box>
                  ))
               }
            </Box>
         </Box>
         <Box
            sx={theme => ({
               width: '70%',
               display: 'grid',
               gridTemplateColumns: 'repeat(4, 1fr)',
               gap: '10px',
               [theme.breakpoints.down('xl')]: {
                  width: '100%'
               },
               [theme.breakpoints.down('lg')]: {
                  gridTemplateColumns: 'repeat(3, 1fr)'
               },
               [theme.breakpoints.down('xs')]: {
                  gridTemplateColumns: 'repeat(2, 1fr)'
               }
            })}
         >
            {
               topics.map((item, index) => (
                  <Button
                     onClick={() => {
                        ref.current.value = item.text;
                        setValue(item.text);
                        setSubmitted(true);
                     }}
                     key={index}
                     disableElevation
                     disableRipple
                     type={submitted ? 'submit' : 'button'}
                     className='pin-card-image-container search-prediction-image-card'
                     sx={theme => ({
                        position: 'relative',
                        height: '75px',
                        width: '150px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        [theme.breakpoints.down('lg')]: {
                           height: '60px'
                        },
                        [theme.breakpoints.down('xs')]: {
                           height: '50px'
                        }
                     })}
                  >
                     <Image
                        src={item.image}
                        alt=''
                        height={75}
                        width={150}
                        objectFit='cover'
                        style={{ borderRadius: '15px' }}
                        quality={50}
                     />
                     <Typography
                        sx={{
                           color: '#fff',
                           fontWeight: 600,
                           fontSize: '13px',
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           zIndex: 1,
                           transform: 'translateX(-50%) translateY(-50%)'
                        }}
                     >
                        {item.text}
                     </Typography>
                  </Button>
               ))
            }
         </Box>
      </Card>
   );
});

SearchPredictionModal.displayName = 'SearchPredictionModal';

export default React.memo(SearchPredictionModal);