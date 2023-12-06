import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch, Typography } from 'antd';
import { useStore } from 'app/store';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const ThemeSwitcher: FC = () => {
  const { settings } = useStore();

  const changeThemeMode = (value: boolean) => {
    settings.setTheme(value ? 'dark' : 'light');
  };

  return (
    <Space>
      <Typography.Text style={{ color: '#fff' }}>Dark mode:</Typography.Text>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        checked={settings.theme === 'dark'}
        onChange={changeThemeMode}
        style={{ marginBottom: '3px' }}
      />
    </Space>
  );
};
export default observer(ThemeSwitcher);
