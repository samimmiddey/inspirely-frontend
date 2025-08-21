import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   allPins: [],
   selectedPin: null,
   isUploaded: false,
   scrollLoading: false,
   getScrolledPosts: true,
   singlePin: {},
   commentLoading: false,
   tabValue: 'one',
   createdPins: [],
   savedPins: [],
   path: '',
   deletePinLoader: false,
   searchedUsers: [],
   notificationData: [],
   notificationCount: 0,
   notificationLoading: false,
   getScrolledNotifications: true,
   notificationError: null
};

const pinSlice = createSlice({
   name: 'pin',
   initialState: initialState,
   reducers: {
      getAllPins: (state, action) => {
         state.allPins = action.payload;
      },
      setSelectedPin: (state, action) => {
         let pins;
         if (state.path.startsWith('/profile')) {
            if (state.tabValue === 'one') {
               pins = state.createdPins;
            } else {
               pins = state.savedPins;
            }
         } else {
            pins = state.allPins;
         }

         state.selectedPin = pins.find(pin => pin._id === action.payload);
      },
      setIsUploaded: (state, action) => {
         state.isUploaded = action.payload;
      },
      setScrollLoading: (state, action) => {
         state.scrollLoading = action.payload;
      },
      setGetScrolledPosts: (state, action) => {
         state.getScrolledPosts = action.payload;
      },
      setSinglePin: (state, action) => {
         state.singlePin = action.payload;
      },
      setCommentLoading: (state, action) => {
         state.commentLoading = action.payload;
      },
      setTabValue: (state, action) => {
         state.tabValue = action.payload;
      },
      setCreatedPins: (state, action) => {
         state.createdPins = action.payload;
      },
      setSavedPins: (state, action) => {
         state.savedPins = action.payload;
      },
      setPath: (state, action) => {
         state.path = action.payload;
      },
      resetPinSlice: () => {
         return initialState;
      },
      setDeletePinLoader: (state, action) => {
         state.deletePinLoader = action.payload;
      },
      setSearchedUsers: (state, action) => {
         state.searchedUsers = action.payload;
      },
      setNotificationData: (state, action) => {
         state.notificationData = action.payload;
      },
      setNotificationCount: (state, action) => {
         state.notificationCount = action.payload;
      },
      setNotificationLoading: (state, action) => {
         state.notificationLoading = action.payload;
      },
      setGetScrolledNotifications: (state, action) => {
         state.getScrolledNotifications = action.payload;
      },
      setNotificationError: (state, action) => {
         state.notificationError = action.payload;
      }
   }
});

export const { getAllPins, setSelectedPin, setIsUploaded, setScrollLoading, setGetScrolledPosts, setSinglePin, setCommentLoading, setCreatedPins, setSavedPins, setTabValue, setPath, resetPinSlice, setDeletePinLoader, setSearchedUsers, setNotificationData, setNotificationCount, setNotificationLoading, setGetScrolledNotifications, setNotificationError } = pinSlice.actions;
export const pinValues = (state) => state.pin;
export default pinSlice;