import { FaDumbbell, FaArtstation } from 'react-icons/fa';
import { MdCameraAlt, MdInsertPhoto, MdWeb, MdWallpaper, MdCardTravel, MdFastfood, MdPets, MdDesignServices, MdDirectionsCar, MdEmail, MdSportsEsports, MdSportsVolleyball } from 'react-icons/md';
import { CgMiniPlayer } from 'react-icons/cg';
import { RiSettings2Fill, RiMusic2Fill, RiFileTextLine, RiPsychotherapyFill, RiFileCodeFill, RiHome5Fill, RiProfileFill, RiLockPasswordFill, RiDeleteBin6Fill } from 'react-icons/ri';
import { GiCampCookingPot, GiMountainRoad, GiGalaxy, GiAbstract086 } from 'react-icons/gi';

export const categories = [
   {
      text: 'Home',
      icon: <RiHome5Fill className='icon-size' />
   },
   {
      text: 'Photography',
      icon: <MdCameraAlt className='icon-size' />
   },
   {
      text: 'Wallpapers',
      icon: <MdInsertPhoto className='icon-size' />
   },
   {
      text: 'Technology',
      icon: <RiSettings2Fill className='icon-size' />
   },
   {
      text: 'Design',
      icon: <MdDesignServices className='icon-size' />
   },
   {
      text: 'Websites',
      icon: <MdWeb className='icon-size' />
   },
   {
      text: 'Coding',
      icon: <RiFileCodeFill className='icon-size' />
   },
   {
      text: 'Fantasy',
      icon: <MdWallpaper className='icon-size' />
   },
   {
      text: 'Abstract',
      icon: <GiAbstract086 className='icon-size' />
   },
   {
      text: 'Minimalism',
      icon: <CgMiniPlayer className='icon-size' />
   },
   {
      text: 'Music',
      icon: <RiMusic2Fill className='icon-size' />
   },
   {
      text: 'Sports',
      icon: <MdSportsVolleyball className='icon-size' />
   },
   {
      text: 'Gaming',
      icon: <MdSportsEsports className='icon-size' />
   },
   {
      text: 'Fitness',
      icon: <FaDumbbell className='icon-size' />
   },
   {
      text: 'Travel',
      icon: <MdCardTravel className='icon-size' />
   },
   {
      text: 'Cooking',
      icon: <GiCampCookingPot className='icon-size' />
   },
   {
      text: 'Nature',
      icon: <GiMountainRoad className='icon-size' />
   },
   {
      text: 'Space',
      icon: <GiGalaxy className='icon-size' />
   },
   {
      text: 'Food',
      icon: <MdFastfood className='icon-size' />
   },
   {
      text: 'Quotes',
      icon: <RiFileTextLine className='icon-size' />
   },
   {
      text: 'Pet',
      icon: <MdPets className='icon-size' />
   },
   {
      text: 'Cars',
      icon: <MdDirectionsCar className='icon-size' />
   },
   {
      text: 'Art',
      icon: <FaArtstation className='icon-size' />
   },
   {
      text: 'Other',
      icon: <RiPsychotherapyFill className='icon-size' />
   }
];

export const navElements = [
   {
      icon: <RiProfileFill className='icon-size' />,
      text: 'General Info'
   },
   {
      icon: <MdEmail className='icon-size' />,
      text: 'Update Email'
   },
   {
      icon: <RiLockPasswordFill className='icon-size' />,
      text: 'Update Password'
   },
   {
      icon: <RiDeleteBin6Fill className='icon-size' />,
      text: 'Delete Account'
   }
];