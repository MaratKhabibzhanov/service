import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ScheduleItem } from 'entities';
import { RegistrationForRepairsForm } from './form';

import { Button, Modal } from 'antd';

type RegistrationForRepairsModalProps = {
  initialData?: RegistrationForRepairs;
  time: string;
  isActive: boolean;
};

// TODO: translate

export const RegistrationForRepairsModal: FC<RegistrationForRepairsModalProps> = (props) => {
  const { t } = useTranslation();
  const { initialData, time, isActive } = props;

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
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
        />
      </Modal>
    </>
  );
};
