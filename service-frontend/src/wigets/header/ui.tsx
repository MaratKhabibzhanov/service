import { Layout } from 'antd';
import { useStore } from 'app/store';
import { FC } from 'react';

export const Header: FC = () => {
  const { auth } = useStore();

  if (!auth.isAuth) return null;

  return <Layout.Header></Layout.Header>;
};
