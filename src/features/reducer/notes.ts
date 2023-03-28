import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { NoteType } from '../../component/shared/types/note';
import { LOADING_STATUSES } from '../constants/redux-state';
import { NotesState } from '../../component/shared/types/notes-state';
import { notesGetAll, noteRemove } from '../../component/note-list/actions';
import {
  noteCreate,
  noteGetOne,
  noteUpdate,
} from '../../component/note-editor/actions';
import { RootState } from '../../store';

const initialState: NotesState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  loadingStatusGetOne: LOADING_STATUSES.PENDING,
  loadingStatusEdit: LOADING_STATUSES.PENDING,
  loadingStatusRemove: LOADING_STATUSES.PENDING,
  errors: null,
  note: null,
};

export const entityAdapter = createEntityAdapter<NoteType>({
  selectId: (model) => model?.id,
});

const initialAdapterState = entityAdapter.getInitialState(initialState);

const slice = createSlice({
  name: 'notes',
  initialState: initialAdapterState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(notesGetAll.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errors = null;
      })
      .addCase(
        notesGetAll.fulfilled.type,
        (state, action: PayloadAction<NoteType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          entityAdapter.setAll(state, action?.payload);
        }
      )
      .addCase(
        notesGetAll.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errors = action?.payload;
        }
      )
      .addCase(noteGetOne.pending.type, (state) => {
        state.loadingStatusGetOne = LOADING_STATUSES.LOADING;
        state.loadingStatusEdit = LOADING_STATUSES.PENDING;
        state.errors = null;
      })
      .addCase(
        noteGetOne.fulfilled.type,
        (state, action: PayloadAction<NoteType>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.IDLE;
          state.note = action?.payload;
        }
      )
      .addCase(
        noteGetOne.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.FAILED;
          state.errors = action?.payload;
        }
      )
      .addCase(noteCreate.pending.type, (state) => {
        state.loadingStatusEdit = LOADING_STATUSES.LOADING;
        state.errors = null;
      })
      .addCase(
        noteCreate.fulfilled.type,
        (state, action: PayloadAction<NoteType>) => {
          state.loadingStatusEdit = LOADING_STATUSES.IDLE;
          entityAdapter.addOne(state, action?.payload);
        }
      )
      .addCase(
        noteCreate.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusEdit = LOADING_STATUSES.FAILED;
          state.errors = action?.payload;
        }
      )
      .addCase(noteUpdate.pending.type, (state) => {
        state.loadingStatusEdit = LOADING_STATUSES.LOADING;
        state.errors = null;
      })
      .addCase(
        noteUpdate.fulfilled.type,
        (state, action: PayloadAction<NoteType>) => {
          state.loadingStatusEdit = LOADING_STATUSES.IDLE;
          entityAdapter.updateOne(state, {
            id: action?.payload?.id,
            changes: action?.payload,
          });
        }
      )
      .addCase(
        noteUpdate.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusEdit = LOADING_STATUSES.FAILED;
          state.errors = action?.payload;
        }
      )
      .addCase(noteRemove.pending.type, (state) => {
        state.loadingStatusRemove = LOADING_STATUSES.LOADING;
        state.errors = null;
      })
      .addCase(
        noteRemove.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loadingStatusRemove = LOADING_STATUSES.IDLE;
          entityAdapter.removeOne(state, action?.payload);
        }
      )
      .addCase(
        noteRemove.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusRemove = LOADING_STATUSES.FAILED;
          state.errors = action?.payload;
        }
      );
  },
});

export default slice.reducer;

const selectors = entityAdapter.getSelectors<RootState>(
  (state) => state.notesReducer
);

export const { selectAll } = selectors;
