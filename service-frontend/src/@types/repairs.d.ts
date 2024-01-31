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
  id?: number;
  day: string;
  time: string;
  acceptor: Acceptor;
  maintenance: Maintenance;
  car: CarInfo;
};

type RegistrationFoeRepairsFields = {
  userId?: number;
  car?: { label: string; value: number };
  acceptor?: number;
  day: Dayjs | null;
  time: Dayjs | null;
  maintenance?: number;
};
