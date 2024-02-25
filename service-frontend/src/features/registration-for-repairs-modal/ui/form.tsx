import { FC, useLayoutEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import debounce from 'debounce';

import { useStore } from 'app/store';
import { useCatch } from 'shared/hooks';
import { formItemLayout } from 'shared/consts';
import { RepairService } from 'shared/api';
import { getCarTitle, getFullName, range } from 'shared/helpers';

import { Button, DatePicker, Form, Select, App, FormInstance } from 'antd';
import { createInitialData } from '../helpers';
import { registrationForRepairsState } from '../model';
import dayjs from 'dayjs';

type RegistrationForRepairsFormProps = {
  initialData?: RegistrationForRepairs;
  formId?: string;
  action?: () => void;
  time: string;
  form: FormInstance<RegistrationFoeRepairsFields>;
};

export const RegistrationForRepairsForm: FC<RegistrationForRepairsFormProps> = observer((props) => {
  const { catchCallback } = useCatch();
  const { t } = useTranslation();

  const { initialData, formId, action, time, form } = props;

  const { profile } = useStore();
  const { notification } = App.useApp();

  const {
    clients,
    cars,
    acceptors,
    maintenances,
    currentMaintenance,
    currentAcceptorId,
    date,
    currentClientId,
    currentCarId,
  } = registrationForRepairsState;

  useLayoutEffect(() => {
    if (profile.profile?.role === 'USER') return;

    registrationForRepairsState.getClients();
  }, [profile.profile?.role]);

  useLayoutEffect(() => {
    if (!currentClientId && initialData?.car.owner.id) {
      registrationForRepairsState.getCars(initialData.car.owner.id);
    } else if (profile.profile?.role === 'USER') {
      registrationForRepairsState.setCars(profile.carsInfo);
    }
  }, [currentClientId, initialData, profile.carsInfo, profile.profile?.role]);

  useLayoutEffect(() => {
    if (!currentCarId) return;

    registrationForRepairsState.getMaintenances(currentCarId);
  }, [currentCarId]);

  const openNotification = (variant: 'success' | 'error', description: string) => {
    notification[variant]({
      message: variant === 'success' ? 'Success' : 'Error',
      description,
    });
  };

  const sendForm = async (values: RegistrationFoeRepairsFields) => {
    const car = formId
      ? cars.find((item) => item.id === currentCarId)
      : profile.carsInfo.find((item) => item.id === values.car);

    if (!car) throw new Error('Car not found');

    const dataToSend: RegistrationForRepairs = {
      day: values.day.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      acceptor: acceptors.find((item) => item.id === values.acceptor) || acceptors[0],
      maintenance: currentMaintenance || maintenances[0],
      car,
    };

    try {
      await RepairService.registrationForRepairs(dataToSend);
      openNotification('success', 'Your entry has been sent');
      if (date && currentAcceptorId) {
        registrationForRepairsState.getNotes({
          day: date.format('YYYY-MM-DD'),
          acceptorId: currentAcceptorId,
        });
      }
      if (action) action();
    } catch (e) {
      catchCallback(e as Error);
    }
  };

  const disableDates = useMemo(() => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime());
    return currentDate;
  }, []);

  // const disabledTimes = () => {
  //   const hours = range(0, 24);
  //   const currentDisabledHours = [...hours.slice(0, 8), ...hours.slice(20, 24)];

  //   return {
  //     disabledHours: () => currentDisabledHours,
  //     disabledMinutes: () => range(30, 60),
  //   };
  // };

  const acceptorsToSelect = acceptors.map((item) => ({
    value: item.id,
    label: getFullName(item),
  }));

  const maintenancesToSelect = maintenances.map((item) => ({
    value: item.id,
    label: item.operation,
  }));

  const carsToSelect = useMemo(() => {
    return cars.map((car) => ({ value: car.id, label: getCarTitle(car) }));
  }, [cars]);

  const clientsToSelect = useMemo(
    () =>
      clients.map((item) => ({
        value: item.id,
        label: getFullName(item),
      })),
    [clients]
  );

  const initialValues = useMemo(() => {
    if (initialData) return createInitialData(initialData);
    const currentValues = {
      time: dayjs(time, 'HH:mm'),
      day: date,
      modifiedCar: carsToSelect.find((item) => item.value === currentCarId),
      acceptor: currentAcceptorId,
      client: currentClientId,
      maintenance: currentMaintenance?.id,
      car: currentCarId,
    };

    return currentValues;
  }, [
    initialData,
    time,
    date,
    carsToSelect,
    currentAcceptorId,
    currentClientId,
    currentMaintenance?.id,
    currentCarId,
  ]);

  const filterOption = (input: string, option?: { label: string; value: number }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const debouncedSearch = debounce(
    (value: string) => registrationForRepairsState.setSearchClient(value),
    500
  );

  return (
    <Form
      name={'registration-for-repairs'}
      id={formId || 'registration-for-repairs'}
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={sendForm}
    >
      {profile.profile?.role === 'MANAGER' && (
        <Form.Item<RegistrationFoeRepairsFields>
          name="userId"
          label={t('Client')}
          rules={[{ required: true, message: t('Please select client!') }]}
        >
          <Select
            options={clientsToSelect}
            filterOption={filterOption}
            showSearch
            onSearch={debouncedSearch}
            onChange={(value) => registrationForRepairsState.setCurrentClientId(value)}
          />
        </Form.Item>
      )}
      <Form.Item<RegistrationFoeRepairsFields>
        name="car"
        label={t('Car')}
        rules={[{ required: true, message: t('Please select car!') }]}
      >
        <Select
          options={carsToSelect}
          onChange={(carId) => registrationForRepairsState.setCurrentCarId(carId)}
        />
      </Form.Item>
      <Form.Item<RegistrationFoeRepairsFields>
        label={t('Acceptor')}
        name="acceptor"
        rules={[{ required: true, message: t('Please select your acceptor!') }]}
      >
        <Select options={acceptorsToSelect} disabled />
      </Form.Item>
      <Form.Item<RegistrationFoeRepairsFields>
        name="day"
        label={t('Date')}
        rules={[{ required: true, message: t('Please input date!') }]}
      >
        <DatePicker disabledDate={(d) => !d || d.isBefore(disableDates)} />
      </Form.Item>
      <Form.Item
        name="time"
        label={t('Time')}
        rules={[{ required: true, message: t('Please input time!') }]}
      >
        <DatePicker.TimePicker format={'HH:mm'} />
      </Form.Item>
      <Form.Item<RegistrationFoeRepairsFields>
        name="maintenance"
        label={t('Type of maintenance')}
        rules={[{ required: true, message: t('Please select type of maintenance!') }]}
      >
        <Select
          options={maintenancesToSelect}
          onChange={(value) =>
            registrationForRepairsState.setCurrentMaintenance(
              maintenances.find((item) => item.id === value) || null
            )
          }
        />
      </Form.Item>
      <Form.Item label={t('Price')}>
        <span>{initialData?.maintenance.total_cost || currentMaintenance?.total_cost}</span>
      </Form.Item>

      {!formId && (
        <Form.Item wrapperCol={{ sm: { offset: 14, span: 6 } }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {t('Submit')}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
});
