import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { pinValues } from '../../Redux/slices/pinSlice';
import PinMasonryGrid from '../UI/PinMasonryGrid';
import CustomTabs from '../UI/CustomTabs';
import CustomErrorCard from '../UI/CustomErrorCard';
import NoPinTemplate from '../UI/NoPinTemplate';
import ProfileGrid from './ProfileGrid';
import { uiValues } from '../../Redux/slices/uiSlice';
import { loadSearchedPinsOnScroll } from '../../Redux/slices/pinThunks';

const SearchComponent = ({ pins, searchKey, error, users }) => {
   const { allPins, tabValue, searchedUsers } = useSelector(pinValues);
   const { darkMode } = useSelector(uiValues);

   const dispatch = useDispatch();

   const searchedPins = allPins.length >= 1 ? allPins : pins;

   const resultantUsers = searchedUsers.length >= 1 ? searchedUsers : users;

   // Load more data on scroll
   const handleScroll = () => {
      dispatch(loadSearchedPinsOnScroll(searchKey));
   };

   return (
      <>
         <Typography
            sx={theme => ({
               marginLeft: '8px',
               marginBottom: '1rem',
               fontWeight: 600,
               color: 'text.primary',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '14px'
               }
            })}
         >
            Search result for <span style={{ color: darkMode ? '#d3223d' : '#e60023' }}>{`${searchKey}`}</span>
         </Typography>
         <CustomTabs
            value={tabValue}
            labelOne='Pins'
            labelTwo='Profiles'
         />
         {error && <CustomErrorCard errorText={error} />}
         {(searchedPins.length === 0 && tabValue === 'one') && <NoPinTemplate />}
         {(resultantUsers.length === 0 && tabValue === 'two') && <NoPinTemplate text='No users found!' />}
         {
            tabValue === 'one' &&
            <PinMasonryGrid
               posts={searchedPins.length >= 1 ? searchedPins : pins}
               handleScroll={handleScroll}
            />
         }
         {
            tabValue === 'two' &&
            <ProfileGrid
               users={resultantUsers}
               handleScroll={handleScroll}
            />
         }
      </>
   );
};

export default SearchComponent;