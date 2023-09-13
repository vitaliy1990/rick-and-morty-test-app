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

export const removeItemLocalStorage = (key: string) => localStorage.removeItem(key);

export const removeRestItemsLocalStorage = (key: string) => {
  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((storageKey: string) => {
    if (storageKey !== key && storageKey !== 'profile') {
      removeItemLocalStorage(storageKey);
    }
  });
};
