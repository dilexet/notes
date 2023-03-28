import React from 'react';
import NoteContainer from '../note/container';
import TagFilterContainer from './tag-filter/container';
import { NoteListComponentProps } from './props';
import './style.scss';
import { Link } from 'react-router-dom';

const NoteList: React.FC<NoteListComponentProps> = ({
  notes,
  activeTags,
  handleTagClick,
  onDeleteNote,
  onTagRemove,
  onTagAdd,
}) => {
  return (
    <div className="notes-container">
      <h2 className="notes-title">Notes</h2>
      <div className="notes-wrapper">
        <div className="tags-form">
          <TagFilterContainer
            activeTags={activeTags}
            onTagSelect={handleTagClick}
          />
        </div>
        <Link to="/new" className="notes-add-button">
          Add note
        </Link>
      </div>
      <ul className="notes-list">
        {notes.map((note) => (
          <NoteContainer
            key={note.id}
            note={note}
            onDeleteNote={onDeleteNote}
            onTagRemove={onTagRemove}
            onTagAdd={onTagAdd}
          />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
