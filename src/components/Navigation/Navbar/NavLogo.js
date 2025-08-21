import { Box } from '@mui/material';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import CustomMenuIcon from '../../UI/CustomMenuIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarRouteIndex, toggleSidebar, uiValues } from '../../../Redux/slices/uiSlice';
import Link from 'next/link';

const NavLogo = ({ showMenu, showLogo, lgWidth }) => {
   const { sidebar } = useSelector(uiValues);
   const dispatch = useDispatch();

   return (
      <Box
         sx={theme => ({
            display: 'flex',
            columnGap: '5px',
            alignItems: 'center',
            height: '100%',
            marginBottom: '2px',
            cursor: 'pointer',
            [theme.breakpoints.down('lg')]: {
               marginRight: '16px'
            },
            [theme.breakpoints.down('md')]: {
               marginRight: 0
            }
         })}
      >
         {
            showMenu &&
            <Box onClick={() => dispatch(toggleSidebar(!sidebar))}>
               <CustomMenuIcon title='Menu'>
                  <FiMenu
                     style={{
                        fontSize: '1.5rem',
                        color: '#868395'
                     }}
                  />
               </CustomMenuIcon>
            </Box>
         }
         {
            showLogo &&
            <Link href='/'>
               <Box
                  onClick={() => {
                     lgWidth && dispatch(toggleSidebar(!sidebar));
                     dispatch(setSidebarRouteIndex(null));
                  }}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '5px'
                  }}
               >
                  <Box
                     sx={theme => ({
                        height: '40px',
                        width: '100%',
                        [theme.breakpoints.down('sm')]: {
                           display: 'none'
                        }
                     })}
                  >
                     <Image
                        src='/logo-1.png'
                        alt='logo'
                        height={40}
                        width={165}
                        objectFit='contain'
                     />
                  </Box>
               </Box>
            </Link>
         }
      </Box>
   );
};

export default NavLogo;