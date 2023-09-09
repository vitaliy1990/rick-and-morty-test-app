import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { RootState } from '../../store';
import MainPageAPI from './MainPageAPI';
import { MainPageState } from './types';
import { Character, CharactersResponse, ServerError } from '../../types';
import { getFirstEpisodeId } from '../../utils/API';

export const initialState: MainPageState = {
  characters: null,
  isLoading: false,
  error: null,
};

export const mainPageSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setCharacters(state, action: PayloadAction<CharactersResponse>) {
      state.characters = action.payload;
    },
    clearCharacters(state) {
      state.characters = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        mainPageSlice.caseReducers.setCharacters(state, action);
        mainPageSlice.caseReducers.clearError(state);
        state.isLoading = false;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        mainPageSlice.caseReducers.setError(state, action);
        state.isLoading = false;
      });
  },
});

export const { setError, clearError, setCharacters, clearCharacters } = mainPageSlice.actions;

export const selectIsLoading = (state: RootState) => state.main.isLoading;
export const selectCharacters = (state: RootState) => state.main.characters;
export const selectError = (state: RootState) => state.main.error;

export const fetchCharacters = createAsyncThunk('product/fetchCharacters', async (page: number, { rejectWithValue }) => {
  try {
    const response = await MainPageAPI.getCharactersByPage(page);
    const characters = response.data;
    const charactersList = await Promise.all(
      characters.results.map(async (character: Character) => {
        const firstEpisodId = getFirstEpisodeId(character);
        const episode = firstEpisodId && (await MainPageAPI.getEpisodeById(firstEpisodId));
        const firstEpisodeName = episode && episode?.data.name;

        return { ...character, firstEpisodeName };
      })
    );
    return { ...characters, results: charactersList };
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    return rejectWithValue({
      message: error?.message,
      status: error?.response?.status,
    });
  }
});

/* export const fetchEpisodeById = createAsyncThunk('product/fetchEpisodeById', async (id: number, { rejectWithValue }) => {
  try {
    const response = await MainPageAPI.getEpisodeById(id);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ServerError>;

    return rejectWithValue({
      message: error?.message,
      status: error?.response?.status,
    });
  }
}); */
