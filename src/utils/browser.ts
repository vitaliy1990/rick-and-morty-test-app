// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDataInLocalStorage = (key: string, value: any) => {
  const valueJSON = JSON.stringify(value);
  localStorage.setItem(key, valueJSON);
};
export const getDataFromLocalStorage = (key: string) => {
  const storeValue = localStorage.getItem(key);

  if (storeValue) {
    return JSON.parse(storeValue);
  }

  return null;
};

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);
