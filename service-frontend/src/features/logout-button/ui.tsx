import { useNavigate } from 'react-router-dom';

import { rootStore } from 'app/store';
import { Button } from 'antd';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    rootStore.auth.logOut();
    navigate('/');
  };

  return (
    <Button type="primary" danger onClick={logout}>
      Log out
    </Button>
  );
};

export default LogoutButton;
