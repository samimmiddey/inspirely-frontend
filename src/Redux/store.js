import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import authSlice from "./slices/authSlice";
import pinSlice from "./slices/pinSlice";

const store = configureStore({
   reducer: {
      ui: uiSlice.reducer,
      auth: authSlice.reducer,
      pin: pinSlice.reducer
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: false,
      })
});

export default store;