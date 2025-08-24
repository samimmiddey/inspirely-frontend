import React from 'react';
import Box from '@mui/material/Box';
import SearchBar from '../../UI/SearchBar';
import { setSearchModal, uiValues } from '../../../Redux/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import SearchPredictionModal from '../../UI/SearchPredictionModal';
import CustomIconButton from '../../UI/CustomIconButton';
import { MdArrowBack } from 'react-icons/md';

const searchbarContainerStyle = theme => ({
   height: '70px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   columnGap: '8px',
   [theme.breakpoints.down('sm')]: {
      height: '65px'
   }
});

const predictionModalContainer = {
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   background: '#F2F3F4',
   transition: '300ms ease'
};

const SearchModal = React.forwardRef(({ value, setValue, submitted, setSubmitted, terms, setTerms }, ref) => {
   const { searchModal } = useSelector(uiValues);

   const dispatch = useDispatch();

   return (
      <>
         <Box
            sx={theme => ({
               display: 'none',
               [theme.breakpoints.down('md')]: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'bg.grey',
                  zIndex: 99999,
                  padding: '0 2rem 0 1rem',
                  transition: '300ms ease',
                  display: searchModal ? 'block' : 'none',
                  [theme.breakpoints.down('sm')]: {
                     padding: '0 1.5rem 0 1rem'
                  },
                  [theme.breakpoints.down('xs')]: {
                     padding: '0 1rem 0 10px'
                  }
               }
            })}
         >
            <Box sx={searchbarContainerStyle}>
               <Box
                  onClick={() => dispatch(setSearchModal(false))}
                  sx={{ color: 'text.icon' }}
               >
                  <CustomIconButton backgroundColor='#F2F3F4'>
                     <MdArrowBack style={{ fontSize: '1.5rem' }} />
                  </CustomIconButton>
               </Box>
               <SearchBar
                  height='10px'
                  value={value}
                  setValue={setValue}
                  setSubmitted={setSubmitted}
                  ref={ref}
               />
            </Box>
         </Box>
         <Box sx={predictionModalContainer}>
            <SearchPredictionModal
               setValue={setValue}
               submitted={submitted}
               setSubmitted={setSubmitted}
               terms={terms}
               setTerms={setTerms}
               ref={ref}
            />
         </Box>
      </>
   );
});

SearchModal.displayName = 'SearchModal';

export default SearchModal;