import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./App.css";
import { Provider } from 'react-redux';
import { persistor, store } from './Redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);