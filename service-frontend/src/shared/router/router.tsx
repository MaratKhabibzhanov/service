import { createBrowserRouter } from 'react-router-dom';

import App from 'app';
import {
  EditCarPage,
  CarsPage,
  ProfilePage,
  RegistrationPage,
  RegistrationForRepairs,
  SchedulePage,
} from 'pages';
import { rootStore } from 'app/store';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: async () => rootStore.auth.refreshTokens(),
    element: <App />,
    children: [
      // {
      //   index: true,
      //   element: <App />,
      // },
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
        path: 'cars',
        element: <CarsPage />,
      },
      {
        path: 'cars/:carId',
        element: <EditCarPage />,
      },
      {
        path: 'registration_for_repairs/:carId',
        element: <RegistrationForRepairs />,
      },
      {
        path: 'schedule',
        element: <SchedulePage />,
      },

      {
        path: '*',
        element: <span style={{ color: 'red' }}>Page not found</span>,
      },
    ],
  },
]);
