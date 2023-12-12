type CarInfo = {
  vin: string;
  number: string;
  sts: string;
  sold_date: string;
  mileage: number;
  car_model: CarModel;
};

type CarModel = {
  id: number;
  model: string;
  image: string;
  engine: number;
};
