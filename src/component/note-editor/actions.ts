import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NOTES } from '../../features/constants/api';
import { NoteType } from '../shared/types/note';

export const noteCreate = createAsyncThunk(
  'note/create',
  async (note: NoteType, thunkAPI) => {
    try {
      const response = await axios.post(NOTES, note);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const noteUpdate = createAsyncThunk(
  'note/update',
  async (note: NoteType, thunkAPI) => {
    try {
      const response = await axios.put(NOTES + `/${note.id}`, note);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const noteGetOne = createAsyncThunk(
  'note/getOne',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(NOTES + `/${id}`);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
