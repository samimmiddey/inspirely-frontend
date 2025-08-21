import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../src/Client/client';
import SearchComponent from '../../src/components/SearchComponents/SearchComponent';
import { searchQuery, userSearchQuery } from '../../src/queries/queries';
import { getAllPins, pinValues, setGetScrolledPosts, setSearchedUsers, setTabValue } from '../../src/Redux/slices/pinSlice';

const SearchPage = ({ pins, searchKey, error, users }) => {
   const { tabValue } = useSelector(pinValues);
   const dispatch = useDispatch();

   // Load initial data
   useEffect(() => {
      dispatch(setTabValue('one'));
      dispatch(getAllPins(pins));
      dispatch(setSearchedUsers(users));
   }, [dispatch, pins, users]);

   // Set scrolled loading state
   useEffect(() => {
      dispatch(setGetScrolledPosts(true));
   }, [dispatch, tabValue]);

   return (
      <SearchComponent
         pins={pins}
         searchKey={searchKey}
         error={error}
         users={users}
      />
   );
};

export default SearchPage;

export const getServerSideProps = async (context) => {
   const { searchID } = context.params;

   try {
      const pinQuery = searchQuery(searchID, 'initial');
      const searchedPins = await client.fetch(pinQuery, { lastCreatedAt: '', lastPostId: '' });

      const userQuery = userSearchQuery(searchID, 'initial');
      const searchedUsers = await client.fetch(userQuery, { lastCreatedAt: '', lastUserId: '' });

      return {
         props: {
            pins: searchedPins,
            searchKey: searchID,
            users: searchedUsers
         }
      };
   } catch (error) {
      return {
         props: {
            error: error.message
         }
      };
   }
};