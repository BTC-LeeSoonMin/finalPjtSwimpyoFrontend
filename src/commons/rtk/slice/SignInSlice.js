import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

const SignInSlice = createSlice({
    name: 'accessToken',
    initialState,
  reducers: {
    setAccessToken: (state, action)=>{

      state.value = action.payload;
    },
  },
});

export const setAccessToken = SignInSlice.actions;
export default SignInSlice;
