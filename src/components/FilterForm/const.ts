import { SelectName } from '../../types';
import { CheckboxField, FilterInputs, IfieldValidValues, SearchFilterInputs } from './types';

export const selectCheckboxFields: Array<CheckboxField> = [
  {
    id: 1,
    label: 'Character',
    name: SelectName.character,
  },
  {
    id: 2,
    label: 'Location',
    name: SelectName.location,
  },
  {
    id: 3,
    label: 'Episodes',
    name: SelectName.episodes,
  },
];

export const characterFilterInputs: Array<SearchFilterInputs> = [
  { id: 1, name: 'name', placeholder: 'Add Name' },
  { id: 2, name: 'status', placeholder: 'Add Status' },
  { id: 3, name: 'species', placeholder: 'Add Species' },
  { id: 4, name: 'type', placeholder: 'Add Type' },
  { id: 5, name: 'gender', placeholder: 'Add Gender' },
];

export const locationFilterInputs: Array<SearchFilterInputs> = [
  { id: 1, name: 'name', placeholder: 'Add Name' },
  { id: 2, name: 'type', placeholder: 'Add Type' },
  { id: 3, name: 'dimension', placeholder: 'Add Dimension' },
];

export const episodesFilterInputs: Array<SearchFilterInputs> = [
  { id: 1, name: 'name', placeholder: 'Add Name' },
  { id: 2, name: 'dimension', placeholder: 'Add Dimension' },
];

export const filterInputs: FilterInputs = {
  [SelectName.character]: characterFilterInputs,
  [SelectName.location]: locationFilterInputs,
  [SelectName.episodes]: episodesFilterInputs,
};

export const fieldValidValues: IfieldValidValues = {
  gender: ['female', 'male', 'genderless'],
  status: ['alive', 'dead'],
};
