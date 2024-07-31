import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production', // Habilitar Redux DevTools solo en desarrollo
});

export default store;
