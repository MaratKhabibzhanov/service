const getFullName = (name: FullName) => {
  return `${name.last_name} ${name.first_name} ${name.patronymic}`;
};

export default getFullName;
