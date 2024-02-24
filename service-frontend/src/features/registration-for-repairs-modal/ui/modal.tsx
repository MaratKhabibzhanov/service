import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';
import { ScheduleItem } from 'entities';
import { RegistrationForRepairsForm } from './form';

import { Button, Form, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { registrationForRepairsState } from '../model';

type RegistrationForRepairsModalProps = {
  initialData?: RegistrationForRepairs;
  time: string;
  isActive: boolean;
};

// TODO: translate

export const RegistrationForRepairsModal: FC<RegistrationForRepairsModalProps> = observer(
  (props) => {
    const { t } = useTranslation();
    const { initialData, time, isActive } = props;

    const { profile } = useStore();
    const [form] = Form.useForm<RegistrationFoeRepairsFields>();

    const [open, setOpen] = useState(false);

    const onClose = () => {
      setOpen(false);

      if (profile?.profile?.role === 'MANAGER') {
        registrationForRepairsState.clearStore();
        form.resetFields();
      }
    };

    return (
      <>
        <ScheduleItem
          data={initialData}
          time={time}
          key={time}
          onClick={isActive ? () => setOpen(true) : undefined}
        />
        <Modal
          open={open}
          onOk={undefined}
          onCancel={onClose}
          title={initialData ? 'Edit' : 'Create'}
          footer={[
            <Button key="back" onClick={isActive ? onClose : undefined}>
              {t('Close')}
            </Button>,
            <Button key="submit" type="primary" onClick={undefined} htmlType="submit" form={time}>
              {t('Save')}
            </Button>,
          ]}
        >
          <RegistrationForRepairsForm
            initialData={initialData}
            formId={time}
            action={onClose}
            time={time}
            form={form}
          />
        </Modal>
      </>
    );
  }
);
