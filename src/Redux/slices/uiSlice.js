import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   sidebar: true,
   searchModal: false,
   userProfileAnchorEl: null,
   snackbar: false,
   showSnackbar: false,
   snackbarText: '',
   errorText: null,
   buttonLoading: false,
   sidebarRouteIndex: null,
   actionAnchorEl: null,
   shareAnchorEl: null,
   pinCardActionAnchorEl: null,
   selected: false,
   selectedID: '',
   selectedShareButton: false,
   inputFocus: false,
   darkMode: false,
   buttonIndex: 0,
   socket: null,
   notificationAnchorEl: null
};

const uiSlice = createSlice({
   name: 'ui',
   initialState: initialState,
   reducers: {
      toggleSidebar: (state, action) => {
         state.sidebar = action.payload;
      },
      setSearchModal: (state, action) => {
         state.searchModal = action.payload;
      },
      toggleUserProfile: (state, action) => {
         state.userProfileAnchorEl = action.payload;
      },
      toggleSnackbar: (state) => {
         state.snackbar = !state.snackbar;
      },
      setSnackbar: (state, action) => {
         state.showSnackbar = action.payload.value;
         state.snackbarText = action.payload.text;
      },
      setErrorText: (state, action) => {
         state.errorText = action.payload;
      },
      setButtonLoading: (state, action) => {
         state.buttonLoading = action.payload;
      },
      setSidebarRouteIndex: (state, action) => {
         state.sidebarRouteIndex = action.payload;
      },
      setActionAnchorEl: (state, action) => {
         state.actionAnchorEl = action.payload;
      },
      setShareAnchorEl: (state, action) => {
         state.shareAnchorEl = action.payload;
      },
      setPinCardActionAnchorEl: (state, action) => {
         state.pinCardActionAnchorEl = action.payload;
      },
      setSelected: (state, action) => {
         state.selected = action.payload;
      },
      setSelectedID: (state, action) => {
         state.selectedID = action.payload;
      },
      setSelectedShareButton: (state, action) => {
         state.selectedShareButton = action.payload;
      },
      setInputFocus: (state, action) => {
         state.inputFocus = action.payload;
      },
      setDarkMode: (state, action) => {
         state.darkMode = action.payload;
      },
      setButtonIndex: (state, action) => {
         state.buttonIndex = action.payload;
      },
      setSocket: (state, action) => {
         state.socket = action.payload;
      },
      setNotificationAnchorEl: (state, action) => {
         state.notificationAnchorEl = action.payload;
      }
   }
});

export const { toggleSidebar, setShowBackdrop, setSearchModal, toggleUserProfile, toggleSnackbar, setSnackbar, setErrorText, setButtonLoading, setSidebarRouteIndex, setActionAnchorEl, setShareAnchorEl, setPinCardActionAnchorEl, setSelected, setSelectedID, setSelectedShareButton, setInputFocus, setDarkMode, setButtonIndex, setSocket, setNotificationAnchorEl } = uiSlice.actions;
export const uiValues = (state) => state.ui;
export default uiSlice;