import { FC, useCallback } from 'react';

import { TIMES_ONE, TIMES_THREE, TIMES_TWO } from './consts';

import { Flex } from 'antd';
import { RegistrationForRepairsModal } from './modal';

type ScheduleProps = {
  items: RegistrationForRepairs[];
  date?: string;
};

const ScheduleList: FC<ScheduleProps> = ({ items, date }) => {
  const renderContent = useCallback(
    (times: string[]) => {
      return times.map((time) => {
        const currentItem = items.find((item) => item.time.slice(0, 5) === time);

        if (currentItem) {
          return <RegistrationForRepairsModal data={currentItem} key={time} time={time} />;
        }

        const data = { time, day: date || '' } as RegistrationForRepairs;

        return <RegistrationForRepairsModal time={time} key={time} data={data} />;
      });
    },
    [items, date]
  );

  return (
    <Flex gap="10px">
      <Flex vertical style={{ width: '200px' }}>
        {renderContent(TIMES_ONE)}
      </Flex>
      <Flex vertical style={{ width: '200px' }}>
        {renderContent(TIMES_TWO)}
      </Flex>
      <Flex vertical style={{ width: '200px' }}>
        {renderContent(TIMES_THREE)}
      </Flex>
    </Flex>
  );
};

export default ScheduleList;
