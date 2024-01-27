import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';
import { ProfileSkeleton } from 'shared/ui';
import { formItemLayout } from 'shared/consts';

import { Button, Flex, Form, Input } from 'antd';
import { UserService } from 'shared/api';
import { ChangePasswordModal } from 'features';

type FieldType = UserToUpdate & { username?: string };

const UserProfile: FC = () => {
  const { t } = useTranslation();
  const { profile } = useStore();
  const { profile: userProfile } = profile;

  const [form] = Form.useForm<FieldType>();

  const [loading, setLoading] = useState(false);

  if (profile.loadingStatus === 'loading') return <ProfileSkeleton />;

  const updateProfile = async (value: FieldType) => {
    setLoading(true);

    try {
      const newProfile = await UserService.updateProfile(value);
      profile.setProfile(newProfile);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="registration"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      initialValues={userProfile || undefined}
      onFinish={updateProfile}
    >
      <Form.Item<FieldType>
        label={t('Username')}
        name="username"
        initialValue={profile.profile?.username}
        rules={[{ required: true, message: t('Please input your username!') }]}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: t('The input is not valid email!'),
          },
          { required: true, message: t('Please input your email!') },
        ]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item<FieldType>
        label={t('First name')}
        name="first_name"
        rules={[{ required: true, message: t('Please input your first name!') }]}
      >
        <Input disabled={loading} />
      </Form.Item>
      <Form.Item<FieldType>
        label={t('Last name')}
        name="last_name"
        rules={[{ required: true, message: t('Please input your last name!') }]}
      >
        <Input disabled={loading} />
      </Form.Item>
      <Form.Item<FieldType>
        label={t('Patronymic')}
        name="patronymic"
        rules={[{ required: true, message: t('Please input your patronymic!') }]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item wrapperCol={{ sm: { offset: 4, span: 16 } }}>
        <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
          <ChangePasswordModal disabled={loading} />
          <Button type="primary" htmlType="submit" loading={loading}>
            {t('Save')}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default observer(UserProfile);
