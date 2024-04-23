import { FC, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { useCatch } from 'shared/hooks';
import { getCarTitle } from 'shared/helpers';

import { Select } from 'antd';
import { registrationForRepairsState } from '../../model';
import { FieldProps } from './types';

export const CarsField: FC<FieldProps> = observer(({ value, onChange }) => {
  const { catchCallback } = useCatch();

  const { profile } = useStore();
  const { cars, currentClientId } = registrationForRepairsState;

  const initialRender = useRef(true);

  useLayoutEffect(() => {
    if (!initialRender || !currentClientId || !profile.profile) return;

    if (profile.profile.role === 'MANAGER') {
      registrationForRepairsState.getCars(currentClientId);
    } else if (profile.carsInfo.length > 0) {
      registrationForRepairsState.setCars(profile.carsInfo);
    } else {
      profile.getCars().then((response) => {
        if (response === 'ok') registrationForRepairsState.setCars(profile.carsInfo);
        else catchCallback(new Error(response));
      });
    }
  }, [catchCallback, currentClientId, profile]);

  const handleChange = useCallback(
    (carId: number) => {
      registrationForRepairsState.setCurrentCarId(carId);
      onChange?.(carId);
    },
    [onChange]
  );

  const carsToSelect = useMemo(() => {
    return cars.map((car) => ({ value: car.id, label: getCarTitle(car) }));
  }, [cars]);

  return <Select value={value} options={carsToSelect} onChange={handleChange} />;
});
