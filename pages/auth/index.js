import { client } from '../../src/Client/client';
import CustomErrorCard from '../../src/components/UI/CustomErrorCard';
import AuthHomePage from '../../src/views/AuthHome/AuthHomePage';

const AuthIndex = ({ posts = [], error }) => {
   // If there is an error
   if (error) {
      return <CustomErrorCard errorText={error} />;
   };

   // If there is no pins to show
   if (!Array.isArray(posts) || posts.length === 0) {
      return <CustomErrorCard errorText={error} />;
   };

   return (
      <AuthHomePage images={posts} />
   );
};

export default AuthIndex;

export const getStaticProps = async () => {
   const query = `*[_type == "auth"] | order(_createdAt asc) [0...25] {
    title,
    image{
      asset->{
        url
      }
    }
  }`;

   try {
      const posts = await client.fetch(query);
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