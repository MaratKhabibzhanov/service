import { createBrowserRouter } from 'react-router-dom';

import App from 'app';
import {
  EditCarPage,
  CarsPage,
  ProfilePage,
  RegistrationPage,
  SchedulePage,
  HomePage,
  ClientsPage,
} from 'pages';
import { rootStore } from 'app/store';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: async () => rootStore.auth.refreshTokens(),
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        path: 'schedule',
        element: <SchedulePage />,
      },
      {
        path: 'manage/schedule',
        element: <SchedulePage />,
      },
      {
        path: 'manage/clients',
        element: <ClientsPage />,
      },

      {
        path: '*',
        element: <span style={{ color: 'red' }}>Page not found</span>,
      },
    ],
  },
]);
