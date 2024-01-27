type Acceptor = FullName & {
  id: number;
};

type Maintenance = {
  id: number;
  operation: string;
  working_time: string;
  car_model: number;
  engine: number;
  total_cost: string;
};

type RegistrationForRepairs = {
  day: string;
  time: string;
  acceptor: Acceptor;
  maintenance: Maintenance;
  car: CarInfo;
};
