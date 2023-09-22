import { FilterDataObject } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setSearchDataInLocalStorage = (filterData: FilterDataObject) => {
  Object.entries(filterData).forEach((item: [string, string][]) => {
    const valueJSON = JSON.stringify(item[1]);
    const key = item[0];
    localStorage.setItem(key, valueJSON);
  });
};

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

export const clearSerchItemsFromLocalStorage = () => {
  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((storageKey: string) => {
    if (storageKey !== 'profile') {
      removeItemLocalStorage(storageKey);
    }
  });
};

export const removeRestItemsLocalStorage = (key: string) => {
  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((storageKey: string) => {
    if (storageKey !== key && storageKey !== 'profile') {
      removeItemLocalStorage(storageKey);
    }
  });
};
