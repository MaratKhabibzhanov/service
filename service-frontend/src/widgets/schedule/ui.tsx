import { FC, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';

import { ScheduleList } from 'features';

import { DatePicker, Space } from 'antd';
import { RepairService } from 'shared/api';

const Schedule: FC = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState<RegistrationForRepairs[]>([]);

  useEffect(() => {
    if (!date) return;

    RepairService.getRepairNotes(date.format('YYYY-MM-DD')).then((data) => {
      setNotes(data.results);
    });
  }, [date]);

  return (
    <Space align="start" size="large">
      <DatePicker value={date} onChange={setDate} />
      <ScheduleList items={notes} />
    </Space>
  );
};

export default Schedule;
