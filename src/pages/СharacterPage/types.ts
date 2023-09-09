import { Character } from '../../types';

export interface CharacterPageState {
  profile: null | Character;
  isLoading: boolean;
  error: null | Error;
}

export interface Error {
  status: string;
  message: string;
}
