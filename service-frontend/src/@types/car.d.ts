type CarInfo = {
  vin: string;
  number: string;
  vehicle_certificate: string;
  sold_date: string;
  mileage: number;
  car_model: CarModel;
  engine: Engine;
};

type CarModel = {
  id: number;
  model: string;
  image: string;
};

type Engine = {
  id: number;
  model: string;
  engine_vol: string;
};
