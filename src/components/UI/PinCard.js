import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { urlFor } from '../../Client/client';
import CustomButton from './CustomButton';
import { MdDownload, MdSave } from 'react-icons/md';
import { RiShareFill } from 'react-icons/ri';
import { HiDotsHorizontal } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import CustomIconButton from './CustomIconButton';
import { useDispatch, useSelector } from 'react-redux';
import { savePin } from '../../Redux/slices/pinThunks';
import ButtonProgress from './ButtonProgress';
import { setPinCardActionAnchorEl, setSelected, setSelectedID, setSelectedShareButton, setShareAnchorEl, setSidebarRouteIndex, uiValues } from '../../Redux/slices/uiSlice';
import { pinValues, setSelectedPin } from '../../Redux/slices/pinSlice';
import Link from 'next/link';
import PinURLButton from './PinURLButton';
import PinCardAction from './PinCardAction';
import ShareModal from './ShareModal';

const imgContainerStyle = {
   position: 'relative',
   overflow: 'hidden',
   borderRadius: '15px'
};

const catgeoryTextStyle = theme => ({
   color: 'text.white',
   fontWeight: 500,
   maxWidth: '100px',
   cursor: 'pointer',
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   }
});

const cardContentStyle = {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   columnGap: '5px'
};

const menuBtnsContainer = {
   display: 'flex',
   alignItems: 'center',
   columnGap: '8px'
};

const cardFooterStyle = theme => ({
   marginTop: '8px',
   cursor: 'pointer',
   [theme.breakpoints.down('xl')]: {
      marginTop: '7px'
   }
});

const pinTitleStyle = theme => ({
   fontSize: '15px',
   fontWeight: 600,
   color: 'text.primary',
   lineHeight: 1.3,
   [theme.breakpoints.down('xl')]: {
      fontSize: '14px'
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '13px'
   },
});

const userInfoStyle = theme => ({
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
   position: 'relative',
   marginTop: '6px',
   [theme.breakpoints.down('xl')]: {
      gap: '5px'
   },
   [theme.breakpoints.down('md')]: {
      marginTop: '4px'
   }
});

const nameStyle = theme => ({
   fontSize: '13px',
   fontWeight: 500,
   width: '82%',
   color: 'text.primary',
   [theme.breakpoints.down('xl')]: {
      fontSize: '12px'
   }
});

const PinCard = ({ data, smWidth, user }) => {
   const { buttonLoading, selected, selectedID, selectedShareButton } = useSelector(uiValues);
   const { selectedPin } = useSelector(pinValues);
   const dispatch = useDispatch();

   let alreadySaved;
   if (data.save) {
      alreadySaved = Boolean(data.save.filter(item => item.userId === user.id).length);
   };

   return (
      <>
         <Link href={`/pin-details/${data._id}`}>
            <Box
               className='pin-card'
               sx={{ paddingBottom: smWidth ? '5px' : '8px' }}
            >
               <Box
                  className='pin-card-image-container'
                  sx={imgContainerStyle}
               >
                  <Image
                     className='pin-card-image'
                     loader={() => urlFor(data.image).width(250).url()}
                     src={urlFor(data.image).url()}
                     alt=''
                     layout='fill'
                     quality={50}
                     placeholder="blur"
                     blurDataURL={urlFor(data.image).width(20).blur(50).url()}
                  />

                  {/* Overlay box */}
                  <Box
                     className={'pin-card-overlay-box'}
                     sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '15px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '12px',
                        opacity: (selected || selectedShareButton) && data._id === selectedID ? 1 : 0,
                        zIndex: 99,
                        cursor: 'zoom-in'
                     }}
                  >
                     <Box sx={cardContentStyle}>
                        <Link href={`/${data.category}`}>
                           <Typography
                              onClick={() => dispatch(setSidebarRouteIndex(null))}
                              className='text-wrap'
                              sx={catgeoryTextStyle}
                           >
                              {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
                           </Typography>
                        </Link>
                        <Box
                           onClick={e => {
                              e.stopPropagation();
                              if (!alreadySaved) {
                                 !buttonLoading && dispatch(setSelectedPin(data._id));
                                 !buttonLoading && dispatch(savePin(data._id, user.id, 'save'));
                              } else {
                                 !buttonLoading && dispatch(setSelectedPin(data._id));
                                 !buttonLoading && dispatch(savePin(data._id, user.id, 'unsave'));
                              }
                           }}
                           sx={{
                              width: smWidth ? 'max-content' : '82px'
                           }}
                        >
                           {
                              smWidth ? (
                                 <CustomIconButton
                                    background={selectedPin?._id === data._id && buttonLoading ? '#e6e6e6' : 'primary.main'}
                                    dimension='32px'
                                 >
                                    {
                                       selectedPin?._id === data._id && buttonLoading ?
                                          <ButtonProgress height={20} width={20} /> :
                                          (
                                             alreadySaved ?
                                                <TiTick style={{ color: '#fff', fontSize: '1.3rem' }} /> :
                                                <MdSave style={{ color: '#fff', fontSize: '1.3rem' }} />
                                          )
                                    }
                                 </CustomIconButton>
                              ) : (
                                 <CustomButton
                                    background={selectedPin?._id === data._id && buttonLoading ? '#e6e6e6' : 'primary.main'}
                                    color='text.white'
                                    type='button'
                                    height='40px'
                                    borderRadius='20px'
                                 >
                                    {
                                       selectedPin?._id === data._id && buttonLoading ?
                                          <ButtonProgress height={20} width={20} /> :
                                          (alreadySaved ? 'Saved' : 'Save')
                                    }
                                 </CustomButton>
                              )
                           }
                        </Box>
                     </Box>
                     <Box
                        sx={theme => ({
                           display: 'flex',
                           justifyContent: data.destination ? 'space-between' : 'flex-end',
                           alignItems: 'center',
                           columnGap: '8px',
                           [theme.breakpoints.down('xs')]: {
                              justifyContent: 'flex-end'
                           }
                        })}
                     >

                        {/* Destination URL button */}
                        {
                           data.destination &&
                           <PinURLButton
                              url={data.destination}
                              maxWidth='100%'
                              padding='8px 10px'
                              iconSize='1rem'
                              textSize={'13px'}
                           />
                        }

                        {/* Menu Buttons */}
                        <Box sx={menuBtnsContainer}>
                           <Box
                              onClick={e => {
                                 e.stopPropagation();
                                 dispatch(setShareAnchorEl(e.currentTarget));
                                 dispatch(setSelectedID(data._id));
                                 dispatch(setSelectedShareButton(true));
                              }}
                           >
                              <CustomIconButton background='#F8F9F9' dimension='32px'>
                                 <RiShareFill
                                    style={{
                                       fontSize: '1.2rem',
                                       color: '#545260'
                                    }}
                                 />
                              </CustomIconButton>
                           </Box>
                           {
                              data.postedBy._id === user.id ? (
                                 <Box
                                    onClick={e => {
                                       e.stopPropagation();
                                       dispatch(setPinCardActionAnchorEl(e.currentTarget));
                                       dispatch(setSelectedID(data._id));
                                       dispatch(setSelected(true));
                                    }}
                                 >
                                    <CustomIconButton background='#F8F9F9' dimension='32px'>
                                       <HiDotsHorizontal
                                          style={{
                                             fontSize: '1.35rem',
                                             color: '#545260'
                                          }}
                                       />
                                    </CustomIconButton>
                                 </Box>
                              ) : (
                                 <a
                                    href={`${data.image?.asset?.url}?dl=`}
                                    download
                                    onClick={e => e.stopPropagation()}
                                 >
                                    <CustomIconButton background='#F8F9F9' dimension='32px'>
                                       <MdDownload />
                                    </CustomIconButton>
                                 </a>
                              )
                           }
                        </Box>
                     </Box>
                  </Box>

               </Box>

               {/* Pin card footer details */}
               <Box sx={cardFooterStyle}>
                  <Typography
                     className='text-wrap-2'
                     sx={pinTitleStyle}
                  >
                     {data.title}
                  </Typography>
                  <Link href={`/profile/${data.postedBy._id}`}>
                     <Box sx={userInfoStyle}>
                        <Image
                           src={data.postedBy.image ? urlFor(data.postedBy.image).width(50).url() : '/avatar.png'}
                           alt=''
                           height={smWidth ? 27 : 32}
                           width={smWidth ? 27 : 32}
                           style={{ borderRadius: '50%' }}
                           objectFit='cover'
                        />
                        <Typography
                           className='text-wrap'
                           sx={nameStyle}
                        >
                           {data.postedBy.userName}
                        </Typography>
                     </Box>
                  </Link>
               </Box>

            </Box>
         </Link>

         {/* Actions */}
         {
            data.postedBy._id === user.id &&
            (
               (selected && data._id === selectedID) &&
               <PinCardAction
                  list={['Download Image', 'Delete Pin']}
                  pin={data}
               />
            )
         }
         {
            (selectedShareButton && selectedID === data._id) &&
            <ShareModal url={`inspirelyhub.vercel.app/pin-details/${data._id}`} />
         }
      </>
   );
};

export default PinCard;