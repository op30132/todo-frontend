const inMemoryJWTManager = () => {
  let inMemoryJWT: string;
  // let isRefreshing: null | Promise<any> = null;

  // const getRefreshing = () => isRefreshing;

  // const setRefreshing = (refreshPromise: Promise<any>) => {
  //   isRefreshing = refreshPromise;
  // };

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