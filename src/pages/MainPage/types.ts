import { CharactersResponse } from '../../types';

export interface MainPageState {
  characters: null | CharactersResponse;
  isLoading: boolean;
  error: null | Error;
}

export interface Error {
  status: string;
  message: string;
}
