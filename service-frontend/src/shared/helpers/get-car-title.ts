const getCarTitle = (car: CarInfo) => {
  return `${car.car_model.model} ${car.number}`;
};

export default getCarTitle;
