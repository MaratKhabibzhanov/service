import { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { useStore } from 'app/store';
import { useCatch } from 'shared/hooks';
import { formItemLayout } from 'shared/consts';

import { Button, DatePicker, Form, App, FormInstance, Flex } from 'antd';
import { createInitialData } from '../helpers';
import { registrationForRepairsState } from '../model';
import { AcceptorsField, CarsField, ClientsField, MaintenancesField } from './fields';

type RegistrationForRepairsFormProps = {
  initialData?: RegistrationForRepairs;
  action?: () => void;
  time?: string;
  form: FormInstance<RegistrationFoeRepairsFields>;
};

export const RegistrationForRepairsForm: FC<RegistrationForRepairsFormProps> = observer((props) => {
  const { catchCallback } = useCatch();
  const { t } = useTranslation();

  const { initialData, action, time, form } = props;
  const { profile } = useStore();
  const { notification } = App.useApp();

  const isDisabledFields = useMemo(
    () => Boolean(initialData?.id && profile.profile?.role === 'USER'),
    [initialData?.id, profile.profile?.role]
  );

  const { currentMaintenance, currentAcceptorId, date, currentClientId, currentCarId } =
    registrationForRepairsState;

  useLayoutEffect(() => {
    if (initialData) {
      // TODO: объединить действия
      registrationForRepairsState.setCurrentClientId(initialData.car.owner.id);
      registrationForRepairsState.setCurrentCarId(initialData.car.id);
    }
  }, [initialData]);

  const openNotification = useCallback(
    (variant: 'success' | 'error', description: string) => {
      notification[variant]({
        message: variant === 'success' ? 'Success' : 'Error',
        description,
      });
    },
    [notification]
  );

  const sendForm = useCallback(
    async (values: RegistrationFoeRepairsFields) => {
      try {
        await registrationForRepairsState.registration(values);
        openNotification('success', 'Your entry has been sent');
        if (action) action();
      } catch (e: unknown) {
        catchCallback(new Error(e as string));
      }
    },
    [action, catchCallback, openNotification]
  );

  const disableDates = useMemo(() => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime());
    return currentDate;
  }, []);

  const initialValues = useMemo(() => {
    if (initialData) return createInitialData(initialData);
    const currentValues = {
      time: dayjs(time, 'HH:mm'),
      day: date,
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
    currentAcceptorId,
    currentClientId,
    currentMaintenance?.id,
    currentCarId,
  ]);

  return (
    <Form
      name={'registration-for-repairs'}
      id={time || 'registration-for-repairs'}
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
          <ClientsField />
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
        <AcceptorsField />
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
        <MaintenancesField />
      </Form.Item>
      {/* TODO: translate */}
      <Flex gap="10px">
        <span>Предварительная стоимость:</span>
        <span>{initialData?.maintenance.total_cost || currentMaintenance?.total_cost}</span>
      </Flex>
      {!time && (
        <Form.Item wrapperCol={{ sm: { offset: 14, span: 6 } }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {t('Submit')}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
});
