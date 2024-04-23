import { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { useStore } from 'app/store';
import { useCatch } from 'shared/hooks';
import { formItemLayout } from 'shared/consts';
import { RepairService } from 'shared/api';
import { getCarTitle, getFullName } from 'shared/helpers';

import { Button, DatePicker, Form, Select, App, FormInstance, Flex } from 'antd';
import { createInitialData } from '../helpers';
import { registrationForRepairsState } from '../model';
import { CarsField, ClientField } from './fields';

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

  const isDisabledFields = useMemo(
    () => Boolean(initialData?.id && profile.profile?.role === 'USER'),
    [initialData?.id, profile.profile?.role]
  );

  const {
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
    if (initialData?.car.owner.id) {
      registrationForRepairsState.setCurrentClientId(initialData.car.owner.id);
    }
  }, [initialData?.car.owner.id]);

  useEffect(() => {
    const carId = initialData?.car.id || currentCarId;
    if (carId) registrationForRepairsState.getMaintenances(carId);
  }, [currentCarId, initialData?.car.id]);

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
          <ClientField />
        </Form.Item>
      )}
      <Form.Item<RegistrationFoeRepairsFields>
        name="car"
        label={t('Car')}
        rules={[{ required: true, message: t('Please select car!') }]}
      >
        <CarsField />
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
        <DatePicker
          disabledDate={(d) => !d || d.isBefore(disableDates)}
          disabled={isDisabledFields}
        />
      </Form.Item>
      <Form.Item
        name="time"
        label={t('Time')}
        rules={[{ required: true, message: t('Please input time!') }]}
      >
        <DatePicker.TimePicker format={'HH:mm'} disabled={isDisabledFields} />
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
      {/* <Form.Item label={t('Price')}>
        <span>{initialData?.maintenance.total_cost || currentMaintenance?.total_cost}</span>
      </Form.Item> */}
      <Flex gap="10px">
        <span>Предварительная стоимость:</span>
        <span>{initialData?.maintenance.total_cost || currentMaintenance?.total_cost}</span>
      </Flex>
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
