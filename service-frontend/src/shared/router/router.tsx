import { createBrowserRouter } from 'react-router-dom';

import App from 'app';
import { ProfilePage, RegistrationPage } from 'pages';

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
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <span style={{ color: 'red' }}>Page not found</span>,
      },
    ],
  },
]);
