import { FC } from 'react';

import { ScheduleItem } from 'entities';
import { TIMES } from './consts';

import { Flex } from 'antd';

type ScheduleProps = {
  items: RegistrationForRepairs[];
};

const ScheduleList: FC<ScheduleProps> = ({ items }) => {
  const partOne = TIMES.slice(0, 8);
  const partTwo = TIMES.slice(8, 16);
  const partThree = TIMES.slice(16);

  const renderContent = (times: string[]) => {
    return times.map((time) => {
      const currentItem = items.find((item) => item.time.slice(0, 5) === time);

      if (currentItem) {
        return <ScheduleItem data={currentItem} key={time} time={time} />;
      }

      return <ScheduleItem time={time} key={time} />;
    });
  };

  return (
    <Flex gap="10px">
      <Flex vertical style={{ width: '200px' }}>
        {renderContent(partOne)}
      </Flex>
      <Flex vertical style={{ width: '200px' }}>
        {renderContent(partTwo)}
      </Flex>
      <Flex vertical style={{ width: '200px' }}>
        {renderContent(partThree)}
      </Flex>
    </Flex>
  );
};

export default ScheduleList;
