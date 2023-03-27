import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOADING_STATUSES } from '../constants/redux-state';
import { tagGetAll } from '../../component/note-list/actions';
import { TagsState } from '../../component/shared/types/tags-state';

const initialState: TagsState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  errors: null,
  tags: [],
};

const slice = createSlice({
  name: 'tags',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tagGetAll.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errors = null;
      })
      .addCase(
        tagGetAll.fulfilled.type,
        (state, action: PayloadAction<string[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.tags = action?.payload;
        }
      )
      .addCase(tagGetAll.rejected.type, (state, action: PayloadAction<any>) => {
        state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
        state.errors = action?.payload;
      });
  },
});

export default slice.reducer;
