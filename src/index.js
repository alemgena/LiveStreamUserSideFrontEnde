import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
//import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
//import { categorySlice } from './slices/category';
//import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { rightDrawerSlice } from './slices/rightDrawer';
//import { Provider } from 'react-redux';
//import { navbarSlice } from './slices/navbar';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { loginSlice } from './slices/login';
import { HelmetProvider } from "react-helmet-async";
import { registerSlice } from './slices/register';
import { verifySlice } from './slices/verify';
import { profileSlice } from './slices/profile';
import { recoverPasswordSlice } from './slices/recover_password';
import { cartSlice } from './slices/cart';
import { videoSlice } from './slices/video';
//require('./index.scss');
const store = configureStore({
  reducer: {
    rightDrawer: rightDrawerSlice.reducer,
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    verify: verifySlice.reducer,
    profile: profileSlice.reducer,
    recoverPassword: recoverPasswordSlice.reducer,
    cart: cartSlice.reducer,

  },
});

ReactDOM.render(
  <Provider store={store}>
< HelmetProvider >
    
    <App />
    </HelmetProvider>
  </Provider>,

  document.getElementById('root')
);
