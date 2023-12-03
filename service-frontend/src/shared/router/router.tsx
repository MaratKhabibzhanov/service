import { createBrowserRouter } from 'react-router-dom';

import App from 'app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <>content</>,
      },
      {
        path: 'login',
        element: <>asd</>,
      },
      {
        path: '*',
        element: <span style={{ color: 'red' }}>error</span>,
      },
    ],
  },
]);
