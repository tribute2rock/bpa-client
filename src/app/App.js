/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { Routes } from '../app/Routes';
import { I18nProvider } from '../_metronic/i18n';
import { LayoutSplashScreen, MaterialThemeProvider } from '../_metronic/layout';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '../redux/configureStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ basename }) {
  let persistor = persistStore(store);

  return (
    <React.Suspense fallback={<LayoutSplashScreen />}>
      {/* Override `basename` (e.g: `homepage` in `package.json`) */}
      {/* <BrowserRouter basename={basename}> */}
      <HashRouter>
        {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
        <MaterialThemeProvider>
          {/* Provide `react-intl` context synchronized with Redux state.  */}
          <I18nProvider>
            {/* Render routes with provided `Layout`. */}
            <Provider store={store}>
              <ToastContainer />
              <PersistGate loading={null} persistor={persistor}>
                <Routes />
              </PersistGate>
            </Provider>
          </I18nProvider>
        </MaterialThemeProvider>
      </HashRouter>
    </React.Suspense>
  );
}
