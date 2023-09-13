import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { mainPageSlice } from '../pages/MainPage/MainPageSlice';
import { characterPageSlice } from '../pages/СharacterPage/СharacterPageSlice';

export const store = configureStore({
  reducer: {
    main: mainPageSlice.reducer,
    character: characterPageSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
