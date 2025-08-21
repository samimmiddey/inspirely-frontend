import React from 'react';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const CustomPagination = ({ page, pageNumbers, handleChangePage, padding }) => {
   const { darkMode } = useSelector(uiValues);

   return (
      <Pagination
         size='small'
         showFirstButton
         showLastButton
         sx={{
            padding: padding,
            '& .MuiPaginationItem-root': {
               '&.Mui-selected': {
                  background: darkMode ? '#d3223d' : '#e60023',
                  color: '#fff',
                  '&:hover': {
                     background: darkMode ? '#d3223d' : '#e60023',
                     color: '#fff'
                  }
               }
            }
         }}
         count={pageNumbers}
         onChange={(event, page) => handleChangePage(page)}
         page={page}
      />
   );
};

export default CustomPagination;