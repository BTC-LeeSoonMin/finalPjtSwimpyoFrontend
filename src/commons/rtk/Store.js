import { configureStore } from '@reduxjs/toolkit';
// import SignInSlice from './slice/SignInSlice';
import SignInSlice from './slice/SignInSlice'


export const store = configureStore({
    reducer:{
    accessToken: SignInSlice.reducer,
  }
});

export default store;