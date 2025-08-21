import React, { useEffect } from 'react';
import { client } from '../../src/Client/client';
import PinDetails from '../../src/components/PinDetailsComponents/PinDetails';
import { categoryQuery, pinDetailsQuery } from '../../src/queries/queries';
import CustomErrorCard from '../../src/components/UI/CustomErrorCard';
import { getAllPins, setGetScrolledPosts, setSinglePin } from '../../src/Redux/slices/pinSlice';
import { useDispatch } from 'react-redux';
import RelatedPins from '../../src/components/RelatedPins/RelatedPins';

const PinDetailsPage = ({ pin, relatedPins, error }) => {
   const dispatch = useDispatch();

   // Set pin on intial load
   useEffect(() => {
      dispatch(setSinglePin(pin));
      dispatch(getAllPins(relatedPins));
      dispatch(setGetScrolledPosts(true));
   }, [dispatch, pin, relatedPins]);

   // If there is an error
   if (error) {
      return <CustomErrorCard errorText={error} />;
   };

   return (
      <>
         <PinDetails pin={pin} />
         <RelatedPins
            pins={relatedPins}
            pinCategory={pin.category}
         />
      </>
   );
};

export default PinDetailsPage;

export const getServerSideProps = async (context) => {
   const { pinID } = context.params;

   try {
      // Single pin
      const query = pinDetailsQuery(pinID);
      const pin = await client.fetch(query);

      if (pin.length === 0) {
         return {
            notFound: true
         }
      }

      // Related pins
      const relatedQuery = categoryQuery(pin[0].category, 'initial');
      const relatedPosts = await client.fetch(relatedQuery, { lastCreatedAt: '', lastPostId: '' });

      return {
         props: {
            pin: pin[0],
            relatedPins: relatedPosts
         }
      }
   } catch (error) {
      return {
         props: {
            error: error.message
         }
      }
   }
};