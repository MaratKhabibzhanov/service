export type CarInfoCardProps = {
  carInfo: CarInfo;
};

export type CarField = { key: keyof Omit<CarInfo, 'car_model'>; label: string };
