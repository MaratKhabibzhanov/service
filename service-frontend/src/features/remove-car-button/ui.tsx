import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

const RemoveCarButton: FC<{ carId: number }> = ({ carId }) => {
  const { t } = useTranslation();
  const { profile } = useStore();

  const confirm = () => {
    profile.removeCar(carId);
  };

  return (
    <Popconfirm
      title={t('Delete the car')}
      description={t('Are you sure to delete this car?')}
      onConfirm={confirm}
      onCancel={undefined}
      okText={t('Yes')}
      cancelText={t('No')}
    >
      <Button danger icon={<DeleteOutlined />} style={{ marginBottom: '20px' }} />
    </Popconfirm>
  );
};

export default RemoveCarButton;
