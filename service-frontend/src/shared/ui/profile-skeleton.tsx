import { Flex, Skeleton, Space } from 'antd';
import { FC } from 'react';

export const ProfileSkeleton: FC = () => {
  return (
    <Flex vertical gap="small">
      <Skeleton.Input style={{ width: '500px' }} active />
      <br />
      <Skeleton.Input style={{ width: '500px' }} active />
      <br />
      <Skeleton.Input style={{ width: '500px' }} active />
      <br />
      <Skeleton.Input style={{ width: '500px' }} active />
      <br />
      <Skeleton.Input style={{ width: '500px' }} active />
      <br />
    </Flex>
  );
};
