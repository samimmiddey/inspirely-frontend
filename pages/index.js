import { useEffect } from 'react';
import { client } from '../src/Client/client';
import HomeFeed from '../src/components/HomeFeed/HomeFeed';
import CustomErrorCard from '../src/components/UI/CustomErrorCard';
import NoPinTemplate from '../src/components/UI/NoPinTemplate';
import { homeQuery } from '../src/queries/queries';
import { getAllPins, setGetScrolledPosts } from '../src/Redux/slices/pinSlice';
import { useDispatch } from 'react-redux';

const HomePage = ({ posts, error }) => {
   const dispatch = useDispatch();

   // Load initial data
   useEffect(() => {
      dispatch(setGetScrolledPosts(true));
      dispatch(getAllPins(posts));
   }, [dispatch, posts]);

   // If there is an error
   if (error) {
      return <CustomErrorCard errorText={error} />;
   };

   // If there is no pins to show
   if (posts.length === 0) {
      return <NoPinTemplate />;
   };

   return (
      <>
         <HomeFeed posts={posts} />
      </>
   );
};

export default HomePage;

export const getServerSideProps = async () => {
   try {
      const query = homeQuery('initial');
      const posts = await client.fetch(query, { lastCreatedAt: '', lastPostId: '' });
      return {
         props: {
            posts: posts
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