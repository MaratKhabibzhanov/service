type NewCarInfo = {
  id?: number;
  vin: string;
  number: string;
  vehicle_certificate: string;
  sold_date: string;
  mileage: number;
  car_model: CarModel;
  engine: Engine;
};

type CarInfo = Required<NewCarInfo> & { owner: FullName & { id: number } };

type CarModel = {
  id: number;
  model: string;
  image?: string;
};

type Engine = {
  id: number;
  model: string;
  engine_vol: string;
};
