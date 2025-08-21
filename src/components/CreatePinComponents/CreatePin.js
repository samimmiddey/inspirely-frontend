import React, { useState } from 'react';
import { Card } from '@mui/material';
import CreateFormFields from './CreateFormFields';
import CreateUpload from './CreateUpload';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { authValues } from '../../Redux/slices/authSlice';
import { createPin } from '../../Redux/slices/pinThunks';
import { pinValues, setIsUploaded } from '../../Redux/slices/pinSlice';
import { useEffect } from 'react';
import Router from 'next/router';

const fields = [
   {
      label: 'Title',
      placeholder: 'Enter title',
      name: 'title',
      type: 'text'
   },
   {
      label: 'About',
      placeholder: 'Enter description',
      name: 'about',
      type: 'text'
   },
   {
      label: 'Destination',
      placeholder: 'Enter destination URL (optional)',
      name: 'destination',
      type: 'text'
   }
];

const defaultValues = {
   image: null,
   title: '',
   about: '',
   destination: '',
   category: ''
};

const CreatePin = () => {
   const [imageFile, setImageFile] = useState(null);
   const [categoryValue, setCategoryValue] = useState('');
   const { user } = useSelector(authValues);
   const { isUploaded } = useSelector(pinValues);
   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      image: Yup.mixed()
         .test('required', 'Image file is required', (value) => {
            return value && value.length
         })
         .test('fileSize', 'The file is too large', (value) => {
            return value && value[0] && value[0].size <= 20000000;
         })
         .test('type', 'We only support JPG, PNG, SVG & GIF', (value) => {
            return value && value[0] && (
               value[0].type === 'image/jpeg' ||
               value[0].type === 'image/png' ||
               value[0].type === 'image/svg' ||
               value[0].type === 'image/gif'
            );
         }),
      title: Yup.string()
         .required('Title is required')
         .min(3, 'Title must be at least 3 characters')
         .max(50, 'Title must not exceed 50 characters')
         .matches(/^\s*([A-Za-z0-9]{1,}([.,] |[-']| ))+[A-Za-z]+.?\s*$/, 'Please enter a valid full title'),
      about: Yup.string()
         .required('Description is required')
         .min(10, 'Description must be at least 10 characters')
         .max(200, 'Description must not exceed 200 characters')
         .matches(/^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{10,200}$/, 'Please enter a valid description'),
      destination: Yup.string()
         .when('destination', {
            is: value => value?.length,
            then: Yup.string()
               .matches(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi, 'Please enter a valid url'),
            otherwise: Yup.string()
         })
         .nullable()
         .optional(),
      category: Yup.string()
         .required('Category is required')
   }, [['image'], ['title'], ['about'], ['destination', 'destination'], ['category']]);

   const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: {
         errors
      }
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValues
   });

   // Handle Signin
   const handleUpload = (data) => {
      dispatch(createPin(data, user.id));
   };

   // Redirect when upload is complete
   useEffect(() => {
      if (isUploaded) {
         setImageFile(null);
         dispatch(setIsUploaded(false));
         setCategoryValue('');
         reset({ ...defaultValues });
         Router.push('/');
      }
   }, [isUploaded, dispatch, reset]);

   return (
      <form onSubmit={handleSubmit((data) => handleUpload(data))}>
         <Card
            className='card-padding'
            elevation={0}
            sx={theme => ({
               maxWidth: '1024px',
               width: '100%',
               margin: '0 auto',
               minHeight: '600px',
               display: 'grid',
               gridTemplateColumns: '5fr 7fr',
               columnGap: '1.5rem',
               [theme.breakpoints.down('md')]: {
                  gridTemplateColumns: 'none',
                  columnGap: 0,
                  rowGap: '1.5rem'
               }
            })}
         >
            <CreateUpload
               name='image'
               imageFile={imageFile}
               setImageFile={setImageFile}
               register={register}
               errors={errors}
               reset={reset}
               getValues={getValues}
            />
            <CreateFormFields
               fields={fields}
               categoryValue={categoryValue}
               setCategoryValue={setCategoryValue}
               register={register}
               errors={errors}
            />
         </Card>
      </form>
   );
};

export default CreatePin;