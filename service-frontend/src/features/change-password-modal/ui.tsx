import { FC, useState } from 'react';

import { UserService } from 'shared/api';

import { Button, Form, Input, Modal } from 'antd';
import { useCatch } from 'shared/hooks';

type FieldType = {
  current_password: string;
  new_password: string;
  confirm: string;
};

const ChangePasswordModal: FC<{ disabled?: boolean }> = ({ disabled }) => {
  const { catchCallback } = useCatch();
  const [form] = Form.useForm<FieldType>();

  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    form.resetFields();
  };

  const onSave = async (values: FieldType) => {
    try {
      await UserService.changePassword(values);
      close();
    } catch (e) {
      catchCallback(e as Error);
    }
  };

  return (
    <>
      <Button type="link" disabled={disabled} onClick={() => setOpen(true)}>
        Change password
      </Button>
      <Modal
        title="Change password"
        open={open}
        footer={null}
        style={{ maxWidth: '400px' }}
        onCancel={close}
        onOk={close}
      >
        <Form
          name="change_password_form"
          form={form}
          scrollToFirstError
          labelCol={{ span: 24 }}
          onFinish={onSave}
        >
          <Form.Item<FieldType>
            label="Current password"
            name="current_password"
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="New password"
            name="new_password"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="Confirm new password"
            name="confirm"
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 16, span: 8 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
