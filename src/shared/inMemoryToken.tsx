const inMemoryJWTManager = () => {
  let inMemoryJWT: string;

  const getToken = () => inMemoryJWT;

  const setToken = (token: string) => {
    inMemoryJWT = token;
    return true;
  };

  const ereaseToken = () => {
    inMemoryJWT = "";
    return true;
  };

  return {
    ereaseToken,
    getToken,
    setToken,
  };
};

export default inMemoryJWTManager();