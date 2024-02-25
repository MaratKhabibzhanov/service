import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RegistrationForm } from 'features';

import { Space, Typography } from 'antd';

const RegistrationPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>{t('Registration')}</Typography.Title>
      <RegistrationForm />
    </Space>
  );
};

export default RegistrationPage;
