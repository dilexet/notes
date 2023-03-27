import { NoteType } from '../shared/types/note';
import React from 'react';

export interface NoteContainerProps {
  note: NoteType;
  onDeleteNote: (id: string) => void;
  onTagRemove: (note: NoteType, tagId: string) => void;
  onTagAdd: (note: NoteType, newTag: string) => void;
}

export interface NoteComponentProps {
  note: NoteType;
  parts: string[];
  newTag: string;
  onDeleteNote: (id: string) => void;
  onTagRemove: (note: NoteType, tagId: string) => void;
  handleTagAdd: () => void;
  handleTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
