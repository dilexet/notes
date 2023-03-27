import { NoteType } from '../shared/types/note';

export interface NoteListComponentProps {
  notes: NoteType[];
  activeTags: string[];
  handleTagClick: (tagId: string | null) => void;
  onDeleteNote: (id: string) => void;
  onTagRemove: (note: NoteType, tagId: string) => void;
  onTagAdd: (note: NoteType, tagId: string) => void;
}
