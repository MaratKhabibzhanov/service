const getFullName = (name: FullName) => {
  return `${name.first_name} ${name.second_name} ${name.patronim}`;
};

export default getFullName;
