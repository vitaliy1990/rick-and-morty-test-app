import { SelectName } from '../../types';

export interface FilterProps {
  handleSubmit: (endpoint: SelectName, param: [string, string][]) => void;
}
