import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import SignInSlice from './slice/SignInSlice';
import SignInSlice from './slice/SignInSlice'
import sessionStorage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';

//combineReducers는 여러개의 reducer를 하나의 root reducer로 합쳐준다. 
// const reducers = combineReducers({
//   reducer:{
//     accessToken: SignInSlice,
//   }
// })

// //key와 storage 필수. whitelist(유지할 값), blacklist(!유지할 값) 
// const persistConfig = {
//   key: 'root', 
//   //세션 스토리지 사용 
//   storage: sessionStorage,
//   //유지하고 싶은 값 배열로 전달 
//   whitelist: ['accessToken']
// }

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//     reducer: persistedReducer,
// });

export const store = configureStore({
  reducer: {
    accessToken: SignInSlice.reducer,
  }
})

export default store;