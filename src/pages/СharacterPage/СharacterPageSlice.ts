import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { RootState } from '../../store';
import { Character, ServerError } from '../../types';
import { CharacterPageState } from './types';
import CharacterPageAPI from './СharacterPageAPI';
import { getFirstEpisodeId } from '../../utils/API';

export const initialState: CharacterPageState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const characterPageSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setCharacterProfile(state, action: PayloadAction<Character>) {
      state.profile = action.payload;
    },
    clearCharacterProfile(state) {
      state.profile = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharacter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        characterPageSlice.caseReducers.setCharacterProfile(state, action);
        characterPageSlice.caseReducers.clearError(state);
        state.isLoading = false;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        characterPageSlice.caseReducers.setError(state, action);
        state.isLoading = false;
      });
  },
});

export const { setError, clearError, setCharacterProfile, clearCharacterProfile } = characterPageSlice.actions;

export const selectIsLoading = (state: RootState) => state.character.isLoading;
export const selectCharacter = (state: RootState) => state.character.profile;
export const selectError = (state: RootState) => state.character.error;

export const fetchCharacter = createAsyncThunk('product/fetchCharacter', async (id: string, { rejectWithValue }) => {
  try {
    const characterResponse = await CharacterPageAPI.getCharacterById(id);
    const firstEpisodId = getFirstEpisodeId(characterResponse.data);
    const episodeResponse = firstEpisodId && (await CharacterPageAPI.getEpisodeById(firstEpisodId));
    const firstEpisodeName = episodeResponse && episodeResponse?.data.name;
    debugger;
    return { ...characterResponse.data, firstEpisodeName };
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    return rejectWithValue({
      message: error?.message,
      status: error?.response?.status,
    });
  }
});
