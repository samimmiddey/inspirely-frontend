import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CustomTextfield from '../UI/CustomTextfield';
import CustomButton from './CustomButton';
import { addComment } from '../../Redux/slices/pinThunks';
import { useDispatch, useSelector } from 'react-redux';
import ButtonProgress from './ButtonProgress';
import { pinValues } from '../../Redux/slices/pinSlice';
import moment from 'moment';
import CustomPagination from './CustomPagination';
import Link from 'next/link';

const field = {
   name: 'comment',
   placeholder: 'Add a comment',
   type: 'text'
};

const value = {
   comment: ''
}

const PinComments = ({ pin, user, smWidth, mdWidth }) => {
   const [page, setPage] = useState(1);
   const { commentLoading } = useSelector(pinValues);
   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      comment: Yup.string()
         .required('Field is required')
         .min(2, 'Comment must be at least 2 characters')
         .max(160, 'Comment must not exceed 160 characters')
         .matches(/^[a-zA-Z0-9\s!@#$%^&*~()_+\-=\[\]{};':"\\|,.<>\/?]{2,160}$/, 'Please enter a valid Comment')
   });

   const {
      register,
      handleSubmit,
      reset,
      formState: {
         errors
      }
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: value
   });

   const handleAddComment = (data) => {
      dispatch(addComment(data.comment, pin._id, user.id, pin.postedBy._id));
      reset({ ...value });
   };

   const sortedComments = pin?.comments?.slice().sort((a, b) => (b.createdAt < a.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0));

   const itemsPerPage = 2;
   const indexOfLastItem = page * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

   let pageNumbers = 0;

   for (let i = 1; i <= Math.ceil(pin?.comments?.length / itemsPerPage); i++) {
      pageNumbers++;
   }

   const handleChangePage = (page) => {
      setPage(page);
   };

   return (
      <Box sx={{ marginTop: '0.5rem' }}>
         <Typography sx={{ fontWeight: 600 }}>
            Comments {`(${pin?.comments?.length ? pin.comments.length : 0})`}
         </Typography>
         <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit((data) => handleAddComment(data))}
         >
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  columnGap: '10px',
                  marginTop: '1rem'
               }}
            >
               <Link href={`/profile/${user.id}`}>
                  <Box
                     sx={{
                        height: mdWidth ? '42px' : '45px',
                        width: mdWidth ? '35px' : '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        cursor: 'pointer'
                     }}
                  >
                     <Image
                        src={user.photoURL || '/avatar.png'}
                        alt=''
                        height={mdWidth ? 30 : 35}
                        width={mdWidth ? 30 : 35}
                        style={{ borderRadius: '50%' }}
                        objectFit='cover'
                     />
                  </Box>
               </Link>
               <Box
                  sx={{
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center'
                  }}
               >
                  <CustomTextfield
                     height={mdWidth ? '8px' : '12px'}
                     placeholder={field.placeholder}
                     name={field.name}
                     type={field.type}
                     borderRadius='8px'
                     register={register}
                     errors={errors}
                  />
                  <Box sx={{ width: '70px', marginTop: '10px' }}>
                     <CustomButton
                        background={!commentLoading && 'primary.main'}
                        color='#fff'
                        type='submit'
                        height={smWidth ? '35px' : '40px'}
                        loading={commentLoading}
                     >
                        {commentLoading ? <ButtonProgress height={20} width={20} /> : 'Post'}
                     </CustomButton>
                  </Box>
               </Box>
            </Box>
         </form>
         <Box
            sx={{
               marginTop: '1.5rem',
               display: 'flex',
               flexDirection: 'column',
               rowGap: '1rem'
            }}
         >
            {sortedComments?.slice(indexOfFirstItem, indexOfLastItem).map((comment, index) => (
               <Box
                  key={index}
                  sx={{
                     display: 'flex',
                     alignItems: 'flex-start',
                     columnGap: '8px'
                  }}
               >
                  <Link href={`/profile/${comment.postedBy._id}`}>
                     <Box sx={{ cursor: 'pointer' }}>
                        <Image
                           src={comment.postedBy.image || '/avatar.png'}
                           alt=''
                           height={mdWidth ? 25 : 30}
                           width={mdWidth ? 25 : 30}
                           style={{ borderRadius: '50%' }}
                           objectFit='cover'
                        />
                     </Box>
                  </Link>
                  <Box>
                     <Link href={`/profile/${comment.postedBy._id}`}>
                        <Typography
                           sx={{
                              fontSize: '15px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              width: 'max-content'
                           }}
                        >
                           {comment.postedBy.userName}
                        </Typography>
                     </Link>
                     <Typography
                        sx={{
                           fontSize: '14px',
                           color: 'text.primary'
                        }}
                     >
                        {comment.comment}
                     </Typography>
                     <Typography
                        sx={{
                           fontSize: '12px',
                           color: 'text.secondary',
                           marginTop: '2px',
                           fontWeight: 500
                        }}
                     >
                        {moment(comment.createdAt).fromNow()}
                     </Typography>
                  </Box>
               </Box>
            ))}
         </Box>
         {/* Pagination */}
         {
            pin?.comments?.length > 0 &&
            <CustomPagination
               page={page}
               pageNumbers={pageNumbers}
               handleChangePage={handleChangePage}
               padding='1rem 0'
            />
         }
      </Box>
   );
};

export default PinComments;