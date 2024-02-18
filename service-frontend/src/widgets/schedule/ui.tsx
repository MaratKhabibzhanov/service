import { FC, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

import { ScheduleList } from 'features';
import { RepairService } from 'shared/api';
import { getFullName } from 'shared/helpers';

import { DatePicker, Flex, Select, Space } from 'antd';

// TODO: state in mobx

const Schedule: FC = () => {
  const { t } = useTranslation();

  const [date, setDate] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState<RegistrationForRepairs[]>([]);

  const [acceptors, setAcceptors] = useState<SelectValue[]>([]);
  const [currentAcceptorId, setCurrentAcceptorId] = useState<number | null>(null);

  useEffect(() => {
    RepairService.getAcceptors().then((response) => {
      setAcceptors(response.results.map((item) => ({ value: item.id, label: getFullName(item) })));
    });
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

  return (
    <Space align="start" size="large">
      <Flex vertical gap="10px" style={{ width: '220px' }}>
        <DatePicker value={date} onChange={setDate} />
        <Select
          options={acceptors}
          onChange={setCurrentAcceptorId}
          value={currentAcceptorId}
          placeholder={t('Select acceptor')}
        />
      </Flex>
      <ScheduleList items={notes} date={date?.format('YYYY-MM-DD')} />
    </Space>
  );
};

export default Schedule;
