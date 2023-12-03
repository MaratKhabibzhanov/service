import { createBrowserRouter } from 'react-router-dom';

import App from 'app';
import { RegistrationPage } from 'pages';

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
        path: 'registration',
        element: <RegistrationPage />,
      },
      {
        path: '*',
        element: <span style={{ color: 'red' }}>error</span>,
      },
    ],
  },
]);
