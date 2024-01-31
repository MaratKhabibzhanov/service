import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';
import { useCatch } from 'shared/hooks';
import { formItemLayout } from 'shared/consts';
import { AdditionalService, RepairService } from 'shared/api';
import { getFullName, range } from 'shared/helpers';

import { Button, DatePicker, Form, Select, App } from 'antd';
import { createInitialData } from './helpers';

type RegistrationForRepairsFormProps = {
  initialData?: RegistrationForRepairs;
  inModal?: boolean;
};

const RegistrationForRepairsForm: FC<RegistrationForRepairsFormProps> = (props) => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { catchCallback } = useCatch();
  const { t } = useTranslation();

  const { initialData, inModal } = props;

  const { profile } = useStore();
  const { notification } = App.useApp();
  const [form] = Form.useForm<RegistrationFoeRepairsFields>();

  const [clients, setClients] = useState<Client[]>([]);
  const [acceptors, setAcceptors] = useState<Acceptor[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  const [currentMaintenance, setCurrentMaintenance] = useState<Maintenance | null>(null);

  useLayoutEffect(() => {
    if (!inModal) return;

    AdditionalService.getUsers().then((response) => {
      setClients(response.results);
    });
  }, [inModal]);

  useLayoutEffect(() => {
    RepairService.getAcceptors().then((response) => {
      setAcceptors(response.results);
    });
  }, []);

  useLayoutEffect(() => {
    if (!initialData?.car?.id && !carId) return;

    const currentCarId = initialData?.car?.id ? initialData.car.id : Number(carId);

    RepairService.getMaintenances(currentCarId).then((response) => {
      setMaintenances(response);
    });
  }, [carId, initialData]);

  const openNotification = (variant: 'success' | 'error', description: string) => {
    notification[variant]({
      message: variant === 'success' ? 'Success' : 'Error',
      description,
    });
  };

  const sendForm = async (values: RegistrationFoeRepairsFields) => {
    const dataToSend: RegistrationForRepairs = {
      day: values.day.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      acceptor: acceptors.find((item) => item.id === values.acceptor) || acceptors[0],
      maintenance: currentMaintenance || maintenances[0],
      car: profile.carsInfo.find((item) => item.id === values.car?.value) || profile.carsInfo[0],
    };

    try {
      await RepairService.registrationForRepairs(dataToSend);
      openNotification('success', 'Your entry has been sent');
      navigate('/');
    } catch (e) {
      catchCallback(e as Error);
    }
  };

  const disableDates = useMemo(() => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime());
    return currentDate;
  }, []);

  const disabledTimes = () => {
    const hours = range(0, 24);
    const currentDisabledHours = [...hours.slice(0, 8), ...hours.slice(20, 24)];

    return {
      disabledHours: () => currentDisabledHours,
      disabledMinutes: () => range(30, 60),
    };
  };

  const acceptorsToSelect = acceptors.map((item) => ({
    value: item.id,
    label: getFullName(item),
  }));

  const maintenancesToSelect = maintenances.map((item) => ({
    value: item.id,
    label: item.operation,
  }));

  const carsToSelect = useMemo(
    () =>
      profile.carsInfo.map((item) => ({
        value: item.id,
        label: `${item.car_model.model} ${item.number}`,
      })),
    [profile.carsInfo]
  );

  const clientsToSelect = clients.map((item) => ({
    value: item.id,
    label: getFullName(item),
  }));

  const initialValues = useMemo(() => {
    // TODO: refactor, как будет готов бэк
    if (initialData) return createInitialData(initialData);

    const currentCar = carsToSelect.find((item) => item.value === Number(carId));
    return { car: currentCar };
  }, [carId, carsToSelect, initialData]);

  return (
    <Form
      name={`registration-for-repairs-${carId}`}
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={sendForm}
    >
      {inModal && (
        <Form.Item<RegistrationFoeRepairsFields>
          name="userId"
          label={t('Client')}
          rules={[{ required: true, message: t('Please select client!') }]}
        >
          <Select options={clientsToSelect} />
        </Form.Item>
      )}
      <Form.Item<RegistrationFoeRepairsFields>
        name="car"
        label={t('Car')}
        rules={[{ required: true, message: t('Please select car!') }]}
      >
        <Select options={carsToSelect} />
      </Form.Item>
      <Form.Item<RegistrationFoeRepairsFields>
        label={t('Acceptor')}
        name="acceptor"
        rules={[{ required: true, message: t('Please select your acceptor!') }]}
      >
        <Select options={acceptorsToSelect} />
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
        <DatePicker.TimePicker disabledTime={disabledTimes} showSecond={false} />
      </Form.Item>
      <Form.Item<RegistrationFoeRepairsFields>
        name="maintenance"
        label={t('Type of maintenance')}
        rules={[{ required: true, message: t('Please select type of maintenance!') }]}
      >
        <Select
          options={maintenancesToSelect}
          onChange={(value) =>
            setCurrentMaintenance(maintenances.find((item) => item.id === value) || null)
          }
        />
      </Form.Item>
      <Form.Item label={t('Price')}>
        <span>{currentMaintenance?.total_cost}</span>
      </Form.Item>

      {!inModal && (
        <Form.Item wrapperCol={{ sm: { offset: 14, span: 6 } }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {t('Submit')}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default observer(RegistrationForRepairsForm);
