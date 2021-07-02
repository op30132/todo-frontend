const inMemoryJWTManager = () => {
  let inMemoryJWT: string;
  const getToken = (): string => inMemoryJWT;

  const setToken = (token: string) => {
    inMemoryJWT = token;
    return true;
  };
  const ereaseToken = () => {
    inMemoryJWT = "";
    return true;
  };
  return {
    getToken,
    setToken,
    ereaseToken
  };
};

export default inMemoryJWTManager();