const getFullName = (name: FullName) => {
  return `${name.first_name} ${name.last_name} ${name.patronymic}`;
};

export default getFullName;
