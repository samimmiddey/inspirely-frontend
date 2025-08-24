import Box from '@mui/material/Box';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import CustomMenuIcon from '../../UI/CustomMenuIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarRouteIndex, toggleSidebar, uiValues } from '../../../Redux/slices/uiSlice';
import Link from 'next/link';

const containerStyle = theme => ({
   display: 'flex',
   columnGap: '5px',
   alignItems: 'center',
   height: '100%',
   marginBottom: '2px',
   cursor: 'pointer',
   [theme.breakpoints.down('lg')]: {
      flexShrink: 0
   },
   [theme.breakpoints.down('md')]: {
      marginRight: 0
   }
});

const NavLogo = ({ showMenu, showLogo, lgWidth, notHide = false }) => {
   const { sidebar } = useSelector(uiValues);
   const dispatch = useDispatch();

   return (
      <Box sx={containerStyle}>
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
                        width: '100%',
                        marginTop: '6px',
                        [theme.breakpoints.down('sm')]: {
                           display: notHide ? 'block' : 'none'
                        }
                     })}
                  >
                     <Image
                        src='/logo.png'
                        alt='logo'
                        height={32}
                        width={165}
                        objectFit='contain'
                        className='logo'
                     />
                  </Box>
               </Box>
            </Link>
         }
      </Box>
   );
};

export default NavLogo;