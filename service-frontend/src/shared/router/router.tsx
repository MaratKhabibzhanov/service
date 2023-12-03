import { createBrowserRouter } from 'react-router-dom';

import App from 'app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: 'login',
        element: <>asd</>,
      },
    ],
  },
]);
