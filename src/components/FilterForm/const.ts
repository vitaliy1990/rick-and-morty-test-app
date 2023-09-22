import { SelectName } from '../../types';
import { FilterInputs, IfieldValidValues, SearchFilterInputs } from './types';

export const characterFilterInputs: Array<SearchFilterInputs> = [
  { id: 1, name: 'name', placeholder: 'Add Name' },
  { id: 2, name: 'status', placeholder: 'Add Status' },
  { id: 3, name: 'species', placeholder: 'Add Species' },
  { id: 4, name: 'type', placeholder: 'Add Type' },
  { id: 5, name: 'gender', placeholder: 'Add Gender' },
];

export const locationFilterInputs: Array<SearchFilterInputs> = [
  { id: 6, name: 'locationName', placeholder: 'Add Location Name' },
  { id: 7, name: 'locationType', placeholder: 'Add Location Type' },
  { id: 8, name: 'dimension', placeholder: 'Add Dimension' },
];

export const episodesFilterInputs: Array<SearchFilterInputs> = [{ id: 9, name: 'episodeName', placeholder: 'Add Episode Name' }];

export const filterInputs: FilterInputs = {
  [SelectName.character]: characterFilterInputs,
  [SelectName.location]: locationFilterInputs,
  [SelectName.episodes]: episodesFilterInputs,
};

export const fieldValidValues: IfieldValidValues = {
  gender: ['female', 'male', 'genderless'],
  status: ['alive', 'dead'],
};
