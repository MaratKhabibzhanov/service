import { FC, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import debounce from 'debounce';
import { observer } from 'mobx-react-lite';

import { getFullName } from 'shared/helpers';

import { Select } from 'antd';

import { registrationForRepairsState } from '../../model';
import { FieldProps } from './types';

export const ClientsField: FC<FieldProps> = observer(({ value, onChange }) => {
  const { clients } = registrationForRepairsState;

  const initialRender = useRef(true);

  useLayoutEffect(() => {
    if (!initialRender.current) return;

    registrationForRepairsState.getClients();
    initialRender.current = false;
  }, []);

  const filterOption = (input: string, option?: { label: string; value: number }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const debouncedSearch = debounce(
    (searchValue: string) => registrationForRepairsState.setSearchClient(searchValue),
    500
  );

  const handleChange = useCallback(
    (newValue: number) => {
      registrationForRepairsState.setCurrentClientId(newValue);
      registrationForRepairsState.setCurrentCarId(null);
      onChange?.(newValue);
    },
    [onChange]
  );

  const clientsToSelect = useMemo(() => {
    return clients.map((item) => ({
      value: item.id,
      label: getFullName(item),
    }));
  }, [clients]);

  return (
    <Select
      value={value}
      options={clientsToSelect}
      filterOption={filterOption}
      showSearch
      onSearch={debouncedSearch}
      onChange={handleChange}
    />
  );
});
