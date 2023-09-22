import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../../store';
import MainPageAPI from './MainPageAPI';
import { MainPageState } from './types';
import { Character, CharactersResponse, FilterDataObject, ServerError } from '../../types';
import { fetchFirstEpisodeNameCharacters, generateSearchParams, getFilterCharacters, getResidentsId } from '../../utils/API';
import { findDuplicatesInArray } from '../../utils/array';
import { CharacterSearchValues } from '../../components/FilterForm/types';

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
    setIsLoading(state, action) {
      state.isLoading = action.payload;
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
    resetMainState(state) {
      state.characters = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        mainPageSlice.caseReducers.setError(state, action);
        state.isLoading = false;
      });
  },
});

export const { setError, clearError, setCharacters, clearCharacters, setIsLoading, resetMainState } = mainPageSlice.actions;

export const selectIsLoading = (state: RootState) => state.main.isLoading;
export const selectCharacters = (state: RootState) => state.main.characters;
export const selectError = (state: RootState) => state.main.error;

export const fetchCharacters = createAsyncThunk('product/fetchCharacters', async (searchParams: string, { rejectWithValue }) => {
  try {
    const response = await MainPageAPI.getCharacters(searchParams);
    const charactersProfiles = response.data;
    const charactersWithFirstEpisodeList = await fetchFirstEpisodeNameCharacters(charactersProfiles.results);
    return { ...charactersProfiles, results: charactersWithFirstEpisodeList };
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    return rejectWithValue({
      message: error?.message,
      status: error?.response?.status,
    });
  }
});

export const fetchCharactersByLocations = createAsyncThunk('product/fetchCharactersByLocations', async (searchParams: string, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setIsLoading(true));
    const responseLocation = await MainPageAPI.getLocations(searchParams);
    const response = await getFilterCharacters(responseLocation.data);
    dispatch(setCharacters(response));
    dispatch(setIsLoading(false));
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    const errorData = {
      message: error?.message,
      status: error?.response?.status,
    };

    dispatch(setError(errorData));
    dispatch(setIsLoading(false));
    return rejectWithValue(errorData);
  }
});

export const fetchCharactersByEpisodes = createAsyncThunk('product/fetchCharactersByEpisodes', async (searchParams: string, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setIsLoading(true));
    const responseEpisode = await MainPageAPI.getEpisodes(searchParams);
    const response = await getFilterCharacters(responseEpisode.data);
    dispatch(setCharacters(response));
    dispatch(setIsLoading(false));
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    const errorData = {
      message: error?.message,
      status: error?.response?.status,
    };

    dispatch(setError(errorData));
    dispatch(setIsLoading(false));
    return rejectWithValue(errorData);
  }
});

export const fetchCharactersByFilter = createAsyncThunk('product/fetchCharactersByEpisodes', async (data: FilterDataObject, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setIsLoading(true));
    const { location, episodes, character } = data;

    const residetsIdList: Array<string> = [];
    if (episodes.length) {
      const responseEpisodes = await MainPageAPI.getEpisodes(generateSearchParams(data.episodes));
      const episodesCharacterIdList = getResidentsId(responseEpisodes.data.results);
      residetsIdList.push(...episodesCharacterIdList);
    }

    if (location.length) {
      const responseLocations = await MainPageAPI.getLocations(generateSearchParams(data.location));
      const locationsCharacterIdList = getResidentsId(responseLocations.data.results);
      residetsIdList.push(...locationsCharacterIdList);
    }

    const duplicateResidentIds = episodes.length && location.length ? findDuplicatesInArray(residetsIdList) : residetsIdList;
    const responseCharacters = await MainPageAPI.getCharactersById(duplicateResidentIds);

    let characterProfile = responseCharacters.data;

    if (character.length) {
      characterProfile = characterProfile.filter((item: Character) => {
        let isValid = true;
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of character) {
          if (!isValid) return false;
          isValid = item[key as keyof CharacterSearchValues]?.toLowerCase().includes(value.toLowerCase());
        }

        return isValid;
      });
    }

    const charactersWithFirstEpisodeList = await fetchFirstEpisodeNameCharacters(characterProfile);
    dispatch(setCharacters({ ...responseCharacters, results: charactersWithFirstEpisodeList }));
    dispatch(setIsLoading(false));
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    const errorData = {
      message: error?.message,
      status: error?.response?.status,
    };

    dispatch(setError(errorData));
    dispatch(setIsLoading(false));
    return rejectWithValue(errorData);
  }
});
