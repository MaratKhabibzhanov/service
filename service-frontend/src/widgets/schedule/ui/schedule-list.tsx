import { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { TIMES_ONE, TIMES_THREE, TIMES_TWO } from '../consts';

import { Flex } from 'antd';
import { RegistrationForRepairsModal, registrationForRepairsState } from 'features';

const ScheduleList: FC = () => {
  const { date, currentAcceptorId, notes } = registrationForRepairsState;

  const renderContent = useCallback(
    (times: string[]) => {
      return times.map((time) => {
        const currentItem = notes.find((item) => item.time.slice(0, 5) === time);

        const modalProps = {
          initialData: currentItem,
          isActive: !!(date && currentAcceptorId),
          time,
        };

        return <RegistrationForRepairsModal key={time} {...modalProps} />;
      });
    },
    [currentAcceptorId, date, notes]
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
