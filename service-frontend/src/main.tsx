import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import { router } from 'shared/router';
import { RootStoreContext, rootStore } from 'app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootStoreContext.Provider value={rootStore}>
      <RouterProvider router={router} />
    </RootStoreContext.Provider>
  </React.StrictMode>
);
