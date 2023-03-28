import { TagType } from '../shared/types/note';
import React from 'react';

export interface NoteEditorComponentProps {
  title: string;
  handleTitleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  content: string;
  handleContentInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  highlightedContent: string;
  tagInput: string;
  handleTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tags: TagType[];
  handleTagDelete: (tagId: string) => void;
  handleSubmit: () => void;
  isCreationMode: boolean;
  isEdit: boolean;
}
