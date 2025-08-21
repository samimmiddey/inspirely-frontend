import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../src/Client/client';
import Profile from '../../src/components/ProfileComponents/Profile';
import { createdPinsQuery, savedPinsQuery, userQuery } from '../../src/queries/queries';
import { pinValues, setCreatedPins, setGetScrolledPosts, setSavedPins, setTabValue } from '../../src/Redux/slices/pinSlice';

const ProfilePage = ({ user, createdPins, error }) => {
   const { tabValue } = useSelector(pinValues);
   const [saveError, setSaveError] = useState(null);
   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   const router = useRouter();

   // Load initial data
   useEffect(() => {
      dispatch(setTabValue('one'));
      dispatch(setCreatedPins(createdPins));
   }, [dispatch, createdPins]);

   // Set scrolled loading state
   useEffect(() => {
      dispatch(setGetScrolledPosts(true));
   }, [dispatch, tabValue]);

   // Load data on client on saved pins tab
   useEffect(() => {
      if (tabValue === 'two') {
         const fetchData = async () => {
            try {
               setLoading(true);
               const query = savedPinsQuery(user._id, 'initial');
               const savedPins = await client.fetch(query, { lastCreatedAt: '', lastPostId: '' });
               dispatch(setSavedPins(savedPins));
               setLoading(false);
            } catch (error) {
               setSaveError(error.message);
            }
         };

         fetchData();
      }
   }, [tabValue, router, dispatch, user._id]);

   return (
      <Profile
         userData={user}
         pins={createdPins}
         error={error}
         saveError={saveError}
         value={tabValue}
         loading={loading}
         tabValue={tabValue}
         userID={user._id}
      />
   );
};

export default ProfilePage;

export const getServerSideProps = async (context) => {
   const { userID } = context.params;

   try {
      const query = userQuery(userID);
      const user = await client.fetch(query);

      const pinsQuery = createdPinsQuery(userID, 'initial');
      const createdPins = await client.fetch(pinsQuery, { lastCreatedAt: '', lastPostId: '' });

      if (user.length === 0) {
         return {
            notFound: true
         };
      }

      return {
         props: {
            user: user[0],
            createdPins: createdPins
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