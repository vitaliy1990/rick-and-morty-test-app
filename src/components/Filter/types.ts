import { SelectName } from '../FilterForm/types';

export interface FilterProps {
  handleSubmit: (endpoint: SelectName, param: [string, string][]) => void;
}
