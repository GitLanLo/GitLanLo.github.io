import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components/app/app';
import { store } from './store';
import { fullOffers } from './mocks/offers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App offersList={fullOffers} />
    </Provider>
  </React.StrictMode>
);
