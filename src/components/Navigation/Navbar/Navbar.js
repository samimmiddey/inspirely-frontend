import React, { useEffect, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import SearchBar from '../../UI/SearchBar';
import NavLogo from './NavLogo';
import NavMenu from './NavMenu';
import { uiValues } from '../../../Redux/slices/uiSlice';
import { useSelector } from 'react-redux';
import SearchPredictionModal from '../../UI/SearchPredictionModal';
import { useRef } from 'react';
import SearchModal from './SearchModal';
import { useRouter } from 'next/router';

const Navbar = ({ lgWidth }) => {
   const [scrolled, setScrolled] = useState(false);
   const [value, setValue] = useState('');
   const { sidebar, inputFocus, darkMode } = useSelector(uiValues);
   const [submitted, setSubmitted] = useState(false);
   const [terms, setTerms] = useState([]);

   const ref = useRef();

   const router = useRouter();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   useEffect(() => {
      window.onscroll = function () {
         if (window.scrollY > 50) {
            setScrolled(true);
         } else {
            setScrolled(false);
         }
      };
   }, []);

   // Handle form submission
   const handleSearch = e => {
      e.preventDefault();
      ref.current.blur();

      if (ref.current.value.trim() !== '') {
         const enteredValue = ref.current.value;
         const terms = JSON.parse(localStorage.getItem('searchTerms'));
         setSubmitted(true);

         if (terms) {
            let newArr;
            if (terms.length === 5) {
               if (terms.includes(enteredValue)) {
                  const arr = terms.filter(item => item !== enteredValue);
                  newArr = [enteredValue, ...arr];
               } else {
                  terms.pop();
                  newArr = [enteredValue, ...terms];
               }
            } else {
               if (terms.length < 5 && !terms.includes(enteredValue)) {
                  newArr = [enteredValue, ...terms];
               } else {
                  const arr = terms.filter(item => item !== enteredValue);
                  newArr = [enteredValue, ...arr];
               }
            }
            setTerms(newArr);
            localStorage.setItem('searchTerms', JSON.stringify(newArr));
         } else {
            setTerms([enteredValue]);
            localStorage.setItem('searchTerms', JSON.stringify([enteredValue]));
         }

         router.push(`/search/${enteredValue}`);
      }
   };

   return (
      <Box
         sx={theme => ({
            position: 'fixed',
            backgroundColor: darkMode ? '#21242c' : '#F2F3F4',
            top: '0',
            left: 0,
            right: 0,
            height: '75px',
            width: '100vw',
            padding: sidebar ? '0 2.5rem 0 306px' : '0 2.5rem 0 2rem',
            transition: '200ms ease',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: '2rem',
            boxShadow: scrolled && !inputFocus && '0 2px 20px 0 rgba(0, 0, 0, 0.1)',
            [theme.breakpoints.down('lg')]: {
               padding: '0 2rem 0 1.5rem'
            },
            [theme.breakpoints.down('md')]: {
               padding: '0 1.5rem 0 1.1rem',
               height: '70px',
               columnGap: 0
            },
            [theme.breakpoints.down('sm')]: {
               height: '65px'
            }
         })}
      >
         {/* Logo */}
         <NavLogo
            showMenu={true}
            showLogo={lgWidth ? true : false}
         />
         {/* SearchBar */}
         <form
            style={{ height: '100%', width: '100%', position: 'relative' }}
            onSubmit={handleSearch}
         >
            {
               !mdWidth &&
               <SearchBar
                  value={value}
                  setValue={setValue}
                  setSubmitted={setSubmitted}
                  darkMode={darkMode}
                  ref={ref}
               />
            }
            {
               !mdWidth &&
               <SearchPredictionModal
                  setValue={setValue}
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  terms={terms}
                  setTerms={setTerms}
                  ref={ref}
               />
            }
            {
               mdWidth &&
               <SearchModal
                  value={value}
                  setValue={setValue}
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  terms={terms}
                  setTerms={setTerms}
                  ref={ref}
               />
            }
         </form>
         {/* Nav Menu */}
         <NavMenu />
      </Box>
   );
};

export default Navbar;