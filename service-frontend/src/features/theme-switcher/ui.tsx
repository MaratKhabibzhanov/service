import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch, Typography } from 'antd';

const ThemeSwitcher: FC = () => {
  const { t } = useTranslation();
  const { settings } = useStore();

  const changeThemeMode = (value: boolean) => {
    settings.setTheme(value ? 'dark' : 'light');
  };

  return (
    <Space>
      <Typography.Text style={{ color: '#fff' }}>{`${t('Dark mode')}:`}</Typography.Text>
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
