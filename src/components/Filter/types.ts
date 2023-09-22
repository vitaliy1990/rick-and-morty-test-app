import { SelectName } from '../../types';

export interface FilterProps {
  handleSubmit: (endpoint: Array<SelectName>, param: [string, string][]) => void;
}
