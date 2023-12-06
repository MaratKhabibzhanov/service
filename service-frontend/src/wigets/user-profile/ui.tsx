import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ProfileSkeleton } from 'shared/ui';

const UserProfile: FC = () => {
  const loading = true;
  return loading ? <ProfileSkeleton /> : <></>;
};

export default observer(UserProfile);
