import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AdditionalService } from 'shared/api';

import { Button, Card, Flex, Image, Modal } from 'antd';

type CarsModalProps = {
  currentModel: CarModel | null;
  setCurrentCar: (car: CarModel) => void;
};

const CarsModal: FC<CarsModalProps> = ({ currentModel, setCurrentCar }) => {
  const { t } = useTranslation();

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
      <Button onClick={() => setOpen(true)}>{currentModel ? t('Change') : t('Add')}</Button>
      <Modal
        title={t('Select your car model')}
        open={open}
        onCancel={() => setOpen(false)}
        width={1028}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            {t('Close')}
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
                  height={220}
                  width={240}
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
