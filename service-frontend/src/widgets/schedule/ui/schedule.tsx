import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { RepairService } from 'shared/api';
import { getFullName } from 'shared/helpers';
import { registrationForRepairsState } from 'features';

import { DatePicker, Flex, Select, Space } from 'antd';
import ScheduleList from './schedule-list';

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
      <ScheduleList items={notes} />
    </Space>
  );
};

export default observer(Schedule);
