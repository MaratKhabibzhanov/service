import { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { TIMES_ONE, TIMES_THREE, TIMES_TWO } from '../consts';

import { Flex } from 'antd';
import { RegistrationForRepairsModal, registrationForRepairsState } from 'features';

type ScheduleProps = {
  items: RegistrationForRepairs[];
};

const ScheduleList: FC<ScheduleProps> = ({ items }) => {
  const { date, currentAcceptorId } = registrationForRepairsState;

  const renderContent = useCallback(
    (times: string[]) => {
      return times.map((time) => {
        const currentItem = items.find((item) => item.time.slice(0, 5) === time);

        const modalProps = {
          initialData: currentItem,
          key: time,
          isActive: !!(date && currentAcceptorId),
          time,
        };

        return <RegistrationForRepairsModal {...modalProps} />;
      });
    },
    [currentAcceptorId, date, items]
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

export default observer(ScheduleList);
