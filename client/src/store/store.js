import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import companyReducer from "./slices/companySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable check
    }),
});
