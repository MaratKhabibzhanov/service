import { FC } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useStore } from 'app/store';

const RemoveCarButton: FC<{ carId: number }> = ({ carId }) => {
  const { profile } = useStore();

  const confirm = () => {
    profile.removeCar(carId);
  };

  return (
    <Popconfirm
      title="Delete the car"
      description="Are you sure to delete this car?"
      onConfirm={confirm}
      onCancel={undefined}
      okText="Yes"
      cancelText="No"
    >
      <Button danger icon={<DeleteOutlined />} />
    </Popconfirm>
  );
};

export default RemoveCarButton;
