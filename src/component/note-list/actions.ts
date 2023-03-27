import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NOTES } from '../../features/constants/api';
import { NoteType } from '../shared/types/note';

export const notesGetAll = createAsyncThunk(
  'notes/getAll',
  async (activeTags: string[] | null, thunkAPI) => {
    try {
      const response = await axios.get(NOTES);
      const notes = response?.data as NoteType[];
      if (!activeTags || activeTags.length <= 0) {
        return notes;
      }
      return notes.filter((note) =>
        note.tags.some((tag) => activeTags.includes(tag.content))
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const noteRemove = createAsyncThunk(
  'note/remove',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(NOTES + `/${id}`);
      return thunkAPI.fulfillWithValue(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const tagGetAll = createAsyncThunk(
  'tags/getAll',
  async (query: string | null, thunkAPI) => {
    try {
      const response = await axios.get(NOTES);
      const notes = response?.data as NoteType[];

      const tags = Array.from(
        new Set(notes.flatMap((note) => note.tags.map((x) => x.content)))
      );
      if (!query) {
        return tags;
      }
      return tags.filter((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
