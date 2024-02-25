import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { ScheduleItem } from 'entities';
import { RepairService } from 'shared/api';
import { useCatch } from 'shared/hooks';

import { RegistrationForRepairsForm } from './form';
import { App, Button, Form, Modal, Popconfirm } from 'antd';
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
    const { catchCallback } = useCatch();
    const { notification } = App.useApp();

    const { initialData, time, isActive } = props;

    const { profile } = useStore();
    const [form] = Form.useForm<RegistrationFoeRepairsFields>();

    const [open, setOpen] = useState(false);

    const onClose = useCallback(() => {
      setOpen(false);

      if (profile?.profile?.role === 'MANAGER') {
        registrationForRepairsState.clearStore();
        form.resetFields();
      }
    }, [form, profile?.profile?.role]);

    const removeRepairNote = useCallback(async () => {
      if (!initialData?.id || !initialData?.acceptor.id) return;

      try {
        await RepairService.removeRepairNote(initialData?.id);
        await registrationForRepairsState.getNotes({
          day: initialData.day,
          acceptorId: initialData?.acceptor.id,
        });

        // TODO: translate
        notification.success({ message: 'Запись успешно удалена' });
        onClose();
      } catch (e) {
        catchCallback(e as Error);
      }
    }, [catchCallback, initialData, notification, onClose]);

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
        // TODO: translate
        buttons.unshift(
          <Popconfirm
            title="Отменить запись"
            description="Вы уверены, что хотите отменить запись?"
            onConfirm={removeRepairNote}
            onCancel={undefined}
            okText={t('Yes')}
            cancelText={t('No')}
          >
            <Button type="primary" key="cancel" danger>
              Отменить запись
            </Button>
          </Popconfirm>
        );
      }

      return buttons;
    }, [initialData, isActive, onClose, profile.profile?.role, removeRepairNote, t, time]);

    return (
      <>
        <ScheduleItem
          data={initialData}
          time={time}
          key={time}
          onClick={isActive ? () => setOpen(true) : undefined}
        />
        {/* TODO: translate  */}
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
      </>
    );
  }
);
