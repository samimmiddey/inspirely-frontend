import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: null,
   authLoading: false,
   onSignUpLoading: false,
   getUserDataLoading: false,
   addUserDataLoading: false,
   verifyEmailLoading: false,
   authErrorText: null,
   resetPasswordEmailSent: false,
   uploadPicLoading: false
};

const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
      setAuthLoading: (state, action) => {
         state.authLoading = action.payload;
      },
      setOnSignUpLoading: (state, action) => {
         state.onSignUpLoading = action.payload;
      },
      setGetUserDataLoading: (state, action) => {
         state.getUserDataLoading = action.payload;
      },
      setAddUserDataLoading: (state, action) => {
         state.addUserDataLoading = action.payload;
      },
      setVerifyEmailLoading: (state, action) => {
         state.verifyEmailLoading = action.payload;
      },
      setAuthErrorText: (state, action) => {
         state.authErrorText = action.payload;
      },
      setResetPasswordEmailSent: (state, action) => {
         state.resetPasswordEmailSent = action.payload;
      },
      setUploadPicLoading: (state, action) => {
         state.uploadPicLoading = action.payload;
      }
   }
});

export const { setUser, setAuthLoading, setOnSignUpLoading, setGetUserDataLoading, setAddUserDataLoading, setVerifyEmailLoading, setAuthErrorText, setResetPasswordEmailSent, setUploadPicLoading } = authSlice.actions;
export const authValues = (state) => state.auth;
export default authSlice;