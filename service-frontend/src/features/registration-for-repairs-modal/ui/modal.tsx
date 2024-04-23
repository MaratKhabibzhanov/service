import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { ScheduleItem } from 'entities';

import { RegistrationForRepairsForm } from './form';
import { Button, Form, Modal } from 'antd';
import { registrationForRepairsState } from '../model';
import { CancelButton } from './cancel-button';

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
    const { date } = registrationForRepairsState;

    const { profile } = useStore();
    const [form] = Form.useForm<RegistrationFoeRepairsFields>();

    const [open, setOpen] = useState(false);

    const onClose = useCallback(() => {
      setOpen(false);

      if (profile?.profile?.role === 'MANAGER') {
        registrationForRepairsState.clearCardState();
        form.resetFields();
      }
    }, [form, profile?.profile?.role]);

    const modalButtons = useMemo(() => {
      const buttons = [
        <Button key="back" onClick={isActive ? onClose : undefined}>
          {t('Close')}
        </Button>,
        <Button key="submit" type="primary" onClick={undefined} htmlType="submit" form={time}>
          {t('Save')}
        </Button>,
      ];

      if (profile.profile?.role === 'MANAGER' && initialData) {
        buttons.unshift(<CancelButton repairData={initialData} onClose={onClose} />);
      }

      return buttons;
    }, [initialData, isActive, onClose, profile.profile?.role, t, time]);

    return (
      <>
        <ScheduleItem
          data={initialData}
          time={time}
          key={time}
          onClick={isActive ? () => setOpen(true) : undefined}
        />
        {/* TODO: translate  */}
        {open && (
          <Modal
            open={open}
            onOk={undefined}
            onCancel={onClose}
            title={initialData ? 'Редактирование' : 'Создание'}
            footer={modalButtons}
          >
            <RegistrationForRepairsForm
              initialData={initialData}
              formId={time}
              action={onClose}
              time={time}
              form={form}
            />
          </Modal>
        )}
      </>
    );
  }
);
