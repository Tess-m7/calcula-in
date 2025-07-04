import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import recetaReducer from './receta/recetaSlice';
import recetaCopaLecheReducer from './recetaCopaLeche/recetaCopaLecheSlice';
import busquedaReducer from './busqueda/busquedaSlice';


export const store = configureStore({
  reducer: {
    receta: recetaReducer,
    recetaCopaLeche: recetaCopaLecheReducer,
    busqueda: busquedaReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;