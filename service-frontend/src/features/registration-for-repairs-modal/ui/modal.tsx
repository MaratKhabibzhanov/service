import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ScheduleItem } from 'entities';
import { RegistrationForRepairsForm } from './form';

import { Button, Modal } from 'antd';
import { registrationForRepairsState } from '../model';

type RegistrationForRepairsModalProps = {
  initialData?: RegistrationForRepairs;
  time: string;
};

// TODO: translate

export const RegistrationForRepairsModal: FC<RegistrationForRepairsModalProps> = (props) => {
  const { t } = useTranslation();
  const { initialData, time } = props;

  const [open, setOpen] = useState(false);

  const { date, currentAcceptorId } = registrationForRepairsState;

  const onClose = () => {
    setOpen(false);
  };

  const scheduleItemData =
    initialData ||
    ({
      day: date,
      time,
      acceptor: currentAcceptorId,
    } as unknown as RegistrationForRepairs);

  return (
    <>
      <ScheduleItem data={scheduleItemData} key={time} onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onOk={undefined}
        onCancel={onClose}
        title={initialData ? 'Edit' : 'Create'}
        footer={[
          <Button key="back" onClick={onClose}>
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
