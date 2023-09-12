import { FormValues } from '../components/FilterForm/types';
import { Character } from '../types';

export const getFirstEpisodeId = (character: Character): number | null => {
  const firstEpisodCharacter = character.episode[0];
  const firstEpisodId = firstEpisodCharacter.split('/').pop();

  if (firstEpisodId) {
    return +firstEpisodId;
  }

  return null;
};

export const findSearchInputs = (formValue: FormValues) => {
  const { character, episodes, location, ...searhcInputs } = formValue;
  return searhcInputs;
};

export const generateSearchParamsList = (formValue: FormValues) => {
  const serchInputs = findSearchInputs(formValue);
  return Object.entries(serchInputs).filter((item: Array<string>) => item[1]);
};

export const generateSearchParams = (data: [string, string][]) => {
  const searchParamsList = data.map((item: Array<string>) => `${item[0]}=${item[1]}`);
  const searchParams = searchParamsList.join('&');
  return encodeURI(searchParams);
};
