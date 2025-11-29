import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { offersList } from './mocks/offers-list';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App offersList={offersList} />
  </React.StrictMode>
);
