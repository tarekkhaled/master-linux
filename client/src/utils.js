export const getAuthCookie = () => {
  const cookiesObject = document.cookie.split("; ").reduce((prev, current) => {
    const [name, value] = current.split("=");
    prev[name] = value;
    return prev;
  }, {});
  return cookiesObject?.albonyan_auth;
};

export const config = (userToken) => {
  const configObject = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  return configObject;
};
