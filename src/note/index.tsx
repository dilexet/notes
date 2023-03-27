import React, { useState } from 'react';
import './style.scss';
import { NoteType } from '../shared/types/note';

interface NoteProps {
  note: NoteType;
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onTagRemove: (noteId: string, tagId: string) => void;
  onTagAdd: (noteId: string, newTag: string) => void;
}

const Note: React.FC<NoteProps> = ({
  note,
  onEditNote,
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
    onTagAdd(note.id, newTag.trim());
    setNewTag('');
  }

  return (
    <li className="note">
      <h3 className="note__title">{note.title}</h3>
      <div className="note__content">
        {parts.map((part, index) =>
          note.tags.some(
            (tag) => part.toLowerCase() === tag.content.toLowerCase()
          ) ? (
            <span className="note__tag" key={index}>
              #{part}
            </span>
          ) : (
            part
          )
        )}
      </div>
      <div className="note__tags">
        {note.tags.map((tag) => (
          <div key={tag.id} className="note__tag">
            <span className="note__tag__content">#{tag.content}</span>
            <button
              className="note__tag__button"
              onClick={() => onTagRemove(note.id, tag.id)}
            >
              &#10005;
            </button>
          </div>
        ))}
        <div className="note__tag__new">
          <input
            type="text"
            className="note__tag__new__input"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag"
          />
          <button className="note__tag__new__button" onClick={handleTagAdd}>
            +
          </button>
        </div>
      </div>
      <div className="note__actions">
        <button
          className="note__edit-button"
          onClick={() => onEditNote(note.id)}
        >
          Edit
        </button>
        <button
          className="note__delete-button"
          onClick={() => onDeleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Note;
