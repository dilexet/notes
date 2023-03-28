import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from './notes';
import tagsReducer from './tags';

export const rootReducer = combineReducers({
  notesReducer,
  tagsReducer,
});
