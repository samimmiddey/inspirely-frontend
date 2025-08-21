import React from 'react';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { deleteSingleNotification, markNotificationAsVisited } from '../../Redux/slices/pinThunks';
import Image from 'next/image';
import { urlFor } from '../../Client/client';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CustomIconButton from './CustomIconButton';

const NotificationItem = ({ handleClose, item, smallWidth, darkMode }) => {
   const dispatch = useDispatch();

   const date = moment(item.createdAt).fromNow();

   return (
      <Box sx={{ position: 'relative' }}>
         <Link href={`/pin-details/${item.pinId}`}>
            <MenuItem
               onClick={() => {
                  handleClose();
                  !item.visited && dispatch(markNotificationAsVisited(item._id));
               }}
               sx={theme => ({
                  width: '325px',
                  padding: '13px',
                  backgroundColor: !item.visited && '#3366cc25',
                  '&:hover': {
                     backgroundColor: !item.visited && '#3366cc35'
                  },
                  margin: '2px 0',
                  [theme.breakpoints.down(400)]: {
                     width: '300px'
                  },
                  [theme.breakpoints.down(375)]: {
                     width: '275px'
                  },
                  [theme.breakpoints.down(350)]: {
                     width: '250px'
                  },
                  [theme.breakpoints.down(325)]: {
                     width: '225px'
                  },
                  [theme.breakpoints.down(300)]: {
                     width: '200px'
                  }
               })}
            >
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '10px',
                     width: '100%'
                  }}
               >
                  {
                     !smallWidth &&
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           height: '40px',
                           width: '40px',
                           borderRadius: '50%'
                        }}
                     >
                        <Image
                           src={item.image ? urlFor(item.image).width(100).url() : '/avatar.png'}
                           alt=''
                           height={40}
                           width={40}
                           style={{ borderRadius: '50%' }}
                        />
                     </Box>
                  }
                  <Box
                     sx={theme => ({
                        display: 'flex',
                        flexDirection: 'column',
                        width: 'calc(100% - 50px)',
                        [theme.breakpoints.down(350)]: {
                           width: '95%'
                        }
                     })}
                  >
                     <Typography
                        className='text-wrap'
                        sx={theme => ({
                           color: 'text.primary',
                           fontWeight: 600,
                           fontSize: '15px',
                           maxWidth: '80%',
                           [theme.breakpoints.down('sm')]: {
                              fontSize: '14px'
                           },
                           [theme.breakpoints.down(350)]: {
                              maxWidth: '80%'
                           }
                        })}
                     >
                        {item.message}
                     </Typography>
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           columnGap: '8px',
                           marginTop: '2px'
                        }}
                     >
                        <Typography
                           sx={{
                              color: 'text.secondary',
                              fontSize: '12px',
                              fontWeight: 600
                           }}
                        >
                           {date}
                        </Typography>
                        <Button
                           sx={theme => ({
                              height: '16px',
                              minWidth: 0,
                              width: 'max-content',
                              backgroundColor: item.visited ? '#3366cc30' : '#e6002330',
                              fontSize: '10px',
                              textTransform: 'none',
                              color: darkMode ? 'text.secondary' : (item.visited ? '#3366cc' : '#e60023'),
                              '&:hover': {
                                 backgroundColor: item.visited ? '#3366cc30' : '#e6002330'
                              },
                              [theme.breakpoints.down(300)]: {
                                 display: 'none'
                              }
                           })}
                        >
                           {item.visited ? 'Visited' : 'Not visited'}
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </MenuItem>
         </Link>
         <Box
            onClick={() => dispatch(deleteSingleNotification(item._id))}
            sx={{
               position: 'absolute',
               top: 0,
               right: '13px',
               height: '100%',
               display: 'flex',
               alignItems: 'center'
            }}
         >
            <CustomIconButton>
               <DeleteOutlineOutlinedIcon sx={{ color: 'text.iconLight' }} />
            </CustomIconButton>
         </Box>
      </Box>
   );
};

export default NotificationItem;