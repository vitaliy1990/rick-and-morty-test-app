import { fieldValidValues } from '../components/FilterForm/const';

export const validateFieldValue = (values: string, inputName: string) => {
  if (values) {
    const currentValue = values.toLowerCase().trim();
    const validValueList = fieldValidValues[inputName];
    return validValueList.includes(currentValue);
  }
};
