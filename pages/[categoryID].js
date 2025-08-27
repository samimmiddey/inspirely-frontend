import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { client } from '../src/Client/client';
import CategoryFeed from '../src/components/CategoryFeed/CategoryFeed';
import { categories } from '../src/Data/data';
import CustomErrorCard from '../src/components/UI/CustomErrorCard';
import NoPinTemplate from '../src/components/UI/NoPinTemplate';
import { categoryQuery } from '../src/queries/queries';
import { getAllPins, setGetScrolledPosts } from '../src/Redux/slices/pinSlice';

const CategoryPage = ({ posts, error }) => {
   const dispatch = useDispatch();

   const router = useRouter();
   const { categoryID } = router.query;

   // Load initial data
   useEffect(() => {
      dispatch(setGetScrolledPosts(true));
      dispatch(getAllPins(posts));
   }, [categoryID, dispatch, posts]);

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
         <CategoryFeed
            posts={posts}
            categoryID={categoryID}
         />
      </>
   );
};

export default CategoryPage;

export const getServerSideProps = async (context) => {
   const { categoryID } = context.params;

   if (!categories.find(item => item.text.toLowerCase() === categoryID)) {
      return {
         notFound: true
      };
   };

   try {
      const query = categoryQuery(categoryID, 'initial');
      const posts = await client.fetch(query, { lastCreatedAt: '', lastPostId: '' });
      return {
         props: {
            key: categoryID,
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