import React, { useState } from 'react';
import Note from './component';
import { NoteContainerProps } from './props';

const NoteContainer: React.FC<NoteContainerProps> = ({
  note,
  onDeleteNote,
  onTagRemove,
  onTagAdd,
}) => {
  const regex = new RegExp(
    `\\b(${note.tags.map((tag) => tag.content).join('|')})\\b`,
    'gi'
  );
  const parts = note.content.split(regex);

  const [newTag, setNewTag] = useState('');

  function handleTagAdd() {
    if (newTag.trim() === '') {
      return;
    }
    onTagAdd(note, newTag.trim());
    setNewTag('');
  }

  function handleTagInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTag(e.target.value);
  }

  return (
    <Note
      note={note}
      parts={parts}
      newTag={newTag}
      onDeleteNote={onDeleteNote}
      onTagRemove={onTagRemove}
      handleTagAdd={handleTagAdd}
      handleTagInputChange={handleTagInputChange}
    />
  );
};

export default NoteContainer;
