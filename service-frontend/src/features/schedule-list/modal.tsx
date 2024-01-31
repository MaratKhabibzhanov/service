import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ScheduleItem } from 'entities';
import { RegistrationForRepairsForm } from 'features';

import { Button, Modal } from 'antd';

type RegistrationForRepairsModalProps = {
  data?: RegistrationForRepairs;
  time: string;
};

// TODO: translate

export const RegistrationForRepairsModal: FC<RegistrationForRepairsModalProps> = (props) => {
  const { t } = useTranslation();
  const { data, time } = props;

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ScheduleItem data={data} key={time} time={time} onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onOk={undefined}
        onCancel={onClose}
        title={data ? 'Edit' : 'Create'}
        footer={[
          <Button key="back" onClick={onClose}>
            {t('Close')}
          </Button>,
          <Button key="submit" type="primary" onClick={undefined}>
            {t('Save')}
          </Button>,
        ]}
      >
        <RegistrationForRepairsForm initialData={data} inModal />
      </Modal>
    </>
  );
};
