import { FC, useEffect, useState } from 'react';

import { Button, Modal } from 'antd';
import { AdditionalService } from 'shared/api';

type CarsModalProps = {
  currentCar?: number;
};

const CarsModal: FC<CarsModalProps> = ({ currentCar }) => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState<CarModel[]>([]);

  useEffect(() => {
    AdditionalService.getCarModels().then((cars) => {
      setCars(cars.results);
    });
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{currentCar ? 'Change' : 'Add'}</Button>
      <Modal title="Select your car mode:" open={open} onCancel={() => setOpen(false)}></Modal>
    </>
  );
};

export default CarsModal;
