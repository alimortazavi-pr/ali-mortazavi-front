import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

//Reducers
import layoutsReducer from "./layouts";

export function makeStore() {
  return configureStore({
    reducer: {
      layouts: layoutsReducer,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
