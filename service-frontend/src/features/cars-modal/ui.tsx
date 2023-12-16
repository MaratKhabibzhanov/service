import { FC, useEffect, useState } from 'react';

import { Button, Card, Flex, Image, Modal } from 'antd';
import { AdditionalService } from 'shared/api';

type CarsModalProps = {
  currentModel: CarModel | null;
  setCurrentCar: (car: CarModel) => void;
};

const CarsModal: FC<CarsModalProps> = ({ currentModel, setCurrentCar }) => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState<CarModel[]>([]);

  useEffect(() => {
    if (open) {
      AdditionalService.getCarModels().then((carsData) => {
        setCars(carsData.results);
      });
    }
  }, [open]);

  const handleClickModel = (model: CarModel) => {
    setCurrentCar(model);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{currentModel ? 'Change' : 'Add'}</Button>
      <Modal
        title="Select your car mode:"
        open={open}
        onCancel={() => setOpen(false)}
        width={1028}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <Flex gap={40} wrap="wrap" justify="center">
          {cars.map((item) => (
            <Card
              hoverable
              key={item.id}
              cover={
                <Image
                  height={280}
                  width={300}
                  src={item.image}
                  alt={item.model}
                  style={{ objectFit: 'cover', objectPosition: 'right' }}
                />
              }
            >
              <Card.Meta
                title={<Button onClick={() => handleClickModel(item)}>{item.model}</Button>}
              />
            </Card>
          ))}
        </Flex>
      </Modal>
    </>
  );
};

export default CarsModal;
