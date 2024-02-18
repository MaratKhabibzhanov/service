import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ScheduleList } from 'features';
import { RepairService } from 'shared/api';
import { getFullName } from 'shared/helpers';

import { DatePicker, Flex, Select, Space } from 'antd';
import { registrationForRepairsState } from 'features/registration-for-repairs-form';
import { observer } from 'mobx-react-lite';

const Schedule: FC = () => {
  const { t } = useTranslation();

  const [notes, setNotes] = useState<RegistrationForRepairs[]>([]);

  const { acceptors, currentAcceptorId, date } = registrationForRepairsState;

  useEffect(() => {
    registrationForRepairsState.getAcceptors();
  }, []);

  useEffect(() => {
    if (!date || !currentAcceptorId) return;

    const params = {
      day: date.format('YYYY-MM-DD'),
      acceptorId: currentAcceptorId,
    };

    RepairService.getRepairNotes(params).then((notesData) => {
      setNotes(notesData.results);
    });
  }, [currentAcceptorId, date]);

  const modifiedAcceptors = acceptors.map((item) => ({
    label: getFullName(item),
    value: item.id,
  }));

  return (
    <Space align="start" size="large">
      <Flex vertical gap="10px" style={{ width: '220px' }}>
        <DatePicker value={date} onChange={(value) => registrationForRepairsState.setDate(value)} />
        <Select
          options={modifiedAcceptors}
          onChange={(value) => registrationForRepairsState.setCurrentAcceptorId(value)}
          value={currentAcceptorId}
          placeholder={t('Select acceptor')}
        />
      </Flex>
      <ScheduleList items={notes} date={date?.format('YYYY-MM-DD')} />
    </Space>
  );
};

export default observer(Schedule);
