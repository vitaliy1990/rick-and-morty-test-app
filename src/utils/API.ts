import { Character } from '../types';

export const getFirstEpisodeId = (character: Character): number | null => {
  const firstEpisodCharacter = character.episode[0];
  const firstEpisodId = firstEpisodCharacter.split('/').pop();

  if (firstEpisodId) {
    return +firstEpisodId;
  }

  return null;
};
