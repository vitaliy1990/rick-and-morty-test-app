import { FormFilterValues } from '../components/FilterForm/types';
import MainPageAPI from '../pages/MainPage/MainPageAPI';
import { Character, ILocationResults, LocationResponse } from '../types';

export const getFirstEpisodeId = (character: Character): number | null => {
  const firstEpisodCharacter = character.episode[0];
  const firstEpisodId = firstEpisodCharacter.split('/').pop();

  if (firstEpisodId) {
    return +firstEpisodId;
  }

  return null;
};

export const findSearchInputs = (formValue: FormFilterValues) => {
  const { character, episodes, location, ...searhcInputs } = formValue;
  return searhcInputs;
};

export const generateSearchParamsList = (formValue: FormFilterValues) => {
  const serchInputs = findSearchInputs(formValue);
  return Object.entries(serchInputs).filter((item: Array<string>) => item[1]);
};

export const generateSearchParams = (data: [string, string][]) => {
  const searchParamsList = data.map((item: Array<string>) => `${item[0]}=${item[1]}`);
  const searchParams = searchParamsList.join('&');
  return encodeURI(searchParams);
};

export const getResidentsId = (results: Array<ILocationResults>) => {
  const residentsId = new Set();
  let characterKeyName = 'characters';

  if (results[0].residents) {
    characterKeyName = 'residents';
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  results.forEach((item: ILocationResults) => item[characterKeyName].forEach((user: string) => residentsId.add(user.split('/').pop())));
  return [...residentsId.keys()] as Array<string>;
};

export const fetchFirstEpisodeNameCharacters = async (characterData: Array<Character>) =>
  Promise.all(
    characterData.map(async (character: Character) => {
      const firstEpisodId = getFirstEpisodeId(character);
      const episode = firstEpisodId && (await MainPageAPI.getEpisodeById(firstEpisodId));
      const firstEpisodeName = episode && episode?.data.name;

      return { ...character, firstEpisodeName };
    })
  );

export const getFilterCharacters = async (response: LocationResponse) => {
  const episodesResults = response.results;
  const residentsId = getResidentsId(episodesResults);
  const characters = await MainPageAPI.getCharactersById(residentsId);
  const characterProfile = characters.data;
  const charactersWithFirstEpisodeList = await fetchFirstEpisodeNameCharacters(characterProfile);

  return { ...characters, results: charactersWithFirstEpisodeList };
};
