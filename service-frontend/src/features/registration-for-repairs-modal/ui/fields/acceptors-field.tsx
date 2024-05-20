import { FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { getFullName } from 'shared/helpers';

import { Select } from 'antd';
import { registrationForRepairsState } from '../../model';
import { FieldProps } from './types';

export const AcceptorsField: FC<FieldProps> = observer(({ value }) => {
  const { acceptors } = registrationForRepairsState;

  const acceptorsToSelect = useMemo(() => {
    return acceptors.map((item) => ({
      value: item.id,
      label: getFullName(item),
    }));
  }, [acceptors]);

  return <Select value={value} options={acceptorsToSelect} disabled />;
});
