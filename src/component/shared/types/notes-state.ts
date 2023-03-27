import { NoteType } from './note';

export interface NotesState {
  loadingStatusGetAll: string;
  loadingStatusEdit: string;
  loadingStatusGetOne: string;
  loadingStatusRemove: string;
  errors: any;
  note: NoteType | null;
}
