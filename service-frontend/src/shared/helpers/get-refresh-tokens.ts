const getRefreshTokens = () => {
  const local = localStorage.getItem('refreshToken');
  const session = sessionStorage.getItem('refreshToken');

  return { local, session };
};

export default getRefreshTokens;
