import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RepairService } from 'shared/api';
import { useCatch } from 'shared/hooks';
import { registrationForRepairsState } from '../model';

import { App, Button, Popconfirm } from 'antd';

type CancelButtonProps = {
  repairData: RegistrationForRepairs;
  onClose: () => void;
};

// TODO: translate
export const CancelButton: FC<CancelButtonProps> = ({ repairData, onClose }) => {
  const { t } = useTranslation();

  const { catchCallback } = useCatch();
  const { notification } = App.useApp();

  const removeRepairNote = async () => {
    if (!repairData?.id || !repairData?.acceptor.id) {
      throw new Error('Repair id or acceptor id not found');
    }

    try {
      await RepairService.removeRepairNote(repairData.id);
      await registrationForRepairsState.getNotes({
        day: repairData.day,
        acceptorId: repairData.acceptor.id,
      });

      // TODO: translate
      notification.success({ message: 'Запись успешно удалена' });
      onClose();
    } catch (e) {
      catchCallback(e as Error);
    }
  };

  return (
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
};
