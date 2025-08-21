import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { urlFor } from '../../Client/client';
import { BsThreeDots } from 'react-icons/bs';
import CustomIconButton from '../UI/CustomIconButton';
import CustomButton from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setActionAnchorEl, uiValues } from '../../Redux/slices/uiSlice';
import { authValues } from '../../Redux/slices/authSlice';
import { savePin } from '../../Redux/slices/pinThunks';
import ButtonProgress from './ButtonProgress';
import PinComments from './PinComments';
import moment from 'moment';
import Link from 'next/link';
import PinURLButton from './PinURLButton';
import { setSelectedPin } from '../../Redux/slices/pinSlice';

const PinDetailsCard = ({ pin, smWidth, mdWidth }) => {
   const { buttonLoading } = useSelector(uiValues);
   const { user } = useSelector(authValues);
   const dispatch = useDispatch();

   let alreadySaved;
   if (pin.save) {
      alreadySaved = Boolean(pin.save.filter(item => item.userId === user.id).length);
   };

   const date = moment(pin.createdAt).fromNow();

   return (
      <Card
         elevation={0}
         sx={theme => ({
            maxWidth: '1024px',
            width: '100%',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            [theme.breakpoints.down('md')]: {
               gridTemplateColumns: 'none',
               maxWidth: '508px'
            }
         })}
      >
         {/* First Box */}
         <Box
            sx={theme => ({
               position: 'relative',
               height: 'max-content',
               [theme.breakpoints.down('md')]: {
                  overflow: 'hidden'
               }
            })}
            className='pin-card-image-container'
         >
            <Image
               className='pin-card-image'
               loader={() => urlFor(pin.image).width(500).url()}
               src={urlFor(pin.image).url()}
               alt=''
               layout='fill'
               objectFit='cover'
               style={{ borderRadius: mdWidth ? '20px 20px 0 0' : '20px 0 0 20px' }}
               quality={50}
               priority
               placeholder='blur'
               blurDataURL={urlFor(pin.image).url()}
            />
            {/* Destination URL */}
            {
               pin.destination &&
               <Box
                  className='pin-details-urlbutton-container'
                  sx={{ position: 'absolute', left: '20px', bottom: '20px' }}>
                  <PinURLButton
                     url={pin.destination}
                     maxWidth='100%'
                     padding='8px 10px'
                     iconSize='1rem'
                     textSize='13px'
                  />
               </Box>
            }
         </Box>
         {/* Second Box */}
         <Box
            sx={theme => ({
               padding: '2rem',
               [theme.breakpoints.down('sm')]: {
                  padding: '1.5rem'
               },
               [theme.breakpoints.down(350)]: {
                  padding: '1rem'
               }
            })}
         >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Box
                  onClick={e => dispatch(setActionAnchorEl(e.currentTarget))}
                  sx={{ marginLeft: '-10px' }}
               >
                  <CustomIconButton>
                     <BsThreeDots style={{ fontSize: '1.75rem' }} />
                  </CustomIconButton>
               </Box>
               <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
                  <Link href={`/${pin.category}`}>
                     <Typography
                        sx={theme => ({
                           color: 'text.primary',
                           fontWeight: 600,
                           cursor: 'pointer',
                           [theme.breakpoints.down(350)]: {
                              display: 'none'
                           }
                        })}
                     >
                        {pin.category.charAt(0).toUpperCase() + pin.category.slice(1)}
                     </Typography>
                  </Link>
                  <Box
                     onClick={e => {
                        e.stopPropagation();
                        if (!alreadySaved) {
                           !buttonLoading && dispatch(setSelectedPin(pin._id));
                           !buttonLoading && dispatch(savePin(pin._id, user.id, 'save', 'pinDetails'));
                        } else {
                           !buttonLoading && dispatch(setSelectedPin(pin._id));
                           !buttonLoading && dispatch(savePin(pin._id, user.id, 'unsave', 'pinDetails'));
                        }
                     }}

                     sx={{ width: '82px' }}
                  >
                     <CustomButton
                        background={!buttonLoading && 'primary.main'}
                        color='#fff'
                        type='button'
                        height='40px'
                        borderRadius='20px'
                        loading={buttonLoading}
                     >
                        {
                           buttonLoading ?
                              <ButtonProgress height={20} width={20} /> :
                              (alreadySaved ? 'Saved' : 'Save')
                        }
                     </CustomButton>
                  </Box>
               </Box>
            </Box>

            {/* Pin Details */}
            <Box
               sx={theme => ({
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '1.5rem',
                  [theme.breakpoints.down('sm')]: {
                     rowGap: '1rem'
                  }
               })}
            >
               <Typography sx={{ color: 'text.primary', fontSize: '15px' }}>
                  {pin.destination}
               </Typography>
               <Box>
                  <Typography
                     sx={theme => ({
                        color: 'text.primary',
                        fontSize: '2rem',
                        fontWeight: 600,
                        lineHeight: '1.4',
                        [theme.breakpoints.down('md')]: {
                           fontSize: '1.75rem'
                        },
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '1.5rem'
                        },
                        [theme.breakpoints.down(350)]: {
                           fontSize: '1.25rem'
                        }
                     })}
                  >
                     {pin.title}
                  </Typography>
                  <Typography
                     sx={theme => ({
                        color: 'text.secondary',
                        marginTop: '3px',
                        fontSize: '15px',
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '14px'
                        },
                        [theme.breakpoints.down(350)]: {
                           fontSize: '14px'
                        }
                     })}
                  >
                     {pin.about}
                  </Typography>
                  <Typography
                     sx={{
                        color: 'text.secondary',
                        marginTop: '5px',
                        fontSize: '13px',
                        fontWeight: 600
                     }}
                  >
                     {date}
                  </Typography>
               </Box>

               {/* User Details */}
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '10px'
                  }}
               >
                  <Link href={`/profile/${pin.postedBy._id}`}>
                     <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Image
                           src={pin.postedBy.image ? urlFor(pin.postedBy.image).width(50).url() : '/avatar.png'}
                           alt=''
                           height={smWidth ? 32 : 50}
                           width={smWidth ? 32 : 50}
                           style={{ borderRadius: '50%' }}
                           objectFit='cover'
                        />
                     </Box>
                  </Link>
                  <Link href={`/profile/${pin.postedBy._id}`}>
                     <Typography
                        className='text-wrap'
                        sx={{ fontSize: '15px', width: '82%', fontWeight: 600, cursor: 'pointer', width: 'max-content' }}
                     >
                        {pin.postedBy.userName}
                     </Typography>
                  </Link>
               </Box>

               {/* Comment Section */}
               <PinComments
                  pin={pin}
                  user={user}
                  smWidth={smWidth}
                  mdWidth={mdWidth}
               />
            </Box>
         </Box>
      </Card>
   );
};

export default PinDetailsCard;