import { SelectName } from '../../types';

export interface FilterFormProps {
  handleSubmitForm: (endpoint: SelectName, param: [string, string][]) => void;
}

export interface FormValues {
  character: boolean;
  location: boolean;
  episodes: boolean;
  text: string;
  name: string;
  status: statusTypes;
  species: string;
  type: string;
  gender: genderTypes;
  dimension: string;
  episode: string;
}

export interface FormSelectValues {
  character: boolean;
  location: boolean;
  episodes: boolean;
}

export interface SearchValues {
  text: string;
  name: string;
  status: statusTypes;
  species: string;
  type: string;
  gender: genderTypes;
  dimension: string;
  episode: string;
}

export interface CheckboxField {
  id: number;
  label: string;
  name: SelectName;
}

export interface SearchFilterInputs {
  id: number;
  name: keyof SearchValues;
  placeholder: string;
}

export type FilterInputs = { [key in SelectName]: Array<SearchFilterInputs> };

export type statusTypes = 'alive' | 'dead' | 'unknown';
export type genderTypes = 'female' | 'male' | 'genderless' | 'unknown';
