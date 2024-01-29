import { FC, useState } from 'react';

import { ScheduleItem } from 'entities';

import { Modal } from 'antd';
import { RegistrationForRepairsForm } from 'features';

type RegistrationForRepairsModalProps = {
  data?: RegistrationForRepairs;
  time: string;
};

// TODO: translate

export const RegistrationForRepairsModal: FC<RegistrationForRepairsModalProps> = (props) => {
  const { data, time } = props;

  const [open, setOpen] = useState(false);

  const [currentData, setCurrentData] = useState<undefined | RegistrationForRepairs>(data);

  const onClose = () => {
    setOpen(false);
    setCurrentData(data);
  };

  return (
    <>
      <ScheduleItem data={data} key={time} time={time} onClick={() => setOpen(true)} />
      <Modal open={open} onOk={undefined} onCancel={onClose} title={data ? 'Edit' : 'Create'}>
        <RegistrationForRepairsForm initialData={currentData} inModal />
      </Modal>
    </>
  );
};
