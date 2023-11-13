import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import  {store}  from "./commons/rtk/Store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

//유지하고픈 redux store 인자로 넣으면 persistor 객체 반환 
// export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
//PersistGate는 유지되는 store의 값이 다시 redux에 저장될 때까지 UI 랜더링 지연시킴.
// loading -> 로딩과정에서 보여줄 컴포넌트 persistor -> 스토리지에 저장할 스토어 
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
