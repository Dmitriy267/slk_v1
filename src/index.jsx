
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
      <Helmet>
        <title>«Солнечный круг» — Детский сад особых детей Тольятти</title>
      </Helmet>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
    </HelmetProvider>
  // </React.StrictMode>
);
