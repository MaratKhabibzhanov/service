import { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { Select } from 'antd';

import { registrationForRepairsState } from '../../model';
import { FieldProps } from './types';

export const MaintenancesField: FC<FieldProps> = observer(({ value, onChange }) => {
  const { maintenances, currentCarId } = registrationForRepairsState;

  useEffect(() => {
    if (currentCarId) registrationForRepairsState.getMaintenances(currentCarId);
  }, [currentCarId]);

  const handleChange = useCallback(
    (newValue: number) => {
      const currentMaintenance = maintenances.find((item) => item.id === newValue) || null;

      registrationForRepairsState.setCurrentMaintenance(currentMaintenance);
      onChange?.(newValue);
    },
    [maintenances, onChange]
  );

  const maintenancesToSelect = useMemo(() => {
    return maintenances.map((item) => ({
      value: item.id,
      label: item.operation,
    }));
  }, [maintenances]);

  return <Select value={value} options={maintenancesToSelect} onChange={handleChange} />;
});
