import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { rootStore } from 'app/store';
import { Button } from 'antd';

const LogoutButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    rootStore.auth.logOut();
    navigate('/');
  };

  return (
    <Button type="primary" danger onClick={logout}>
      {t('Sign Out')}
    </Button>
  );
};

export default observer(LogoutButton);
