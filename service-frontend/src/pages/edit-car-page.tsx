import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EditCarForm } from 'widgets';

import { Space, Typography } from 'antd';

const EditCarPage: FC = () => {
  const { t } = useTranslation();
  const { carId } = useParams();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>{carId === 'new' ? t('Adding a car') : t('My car')}</Typography.Title>
      <EditCarForm />
    </Space>
  );
};

export default EditCarPage;
