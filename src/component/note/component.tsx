import React from 'react';
import { NoteComponentProps } from './props';
import './style.scss';
import { Link } from 'react-router-dom';

const Note: React.FC<NoteComponentProps> = ({
  note,
  parts,
  newTag,
  onDeleteNote,
  onTagRemove,
  handleTagAdd,
  handleTagInputChange,
}) => {
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
            <span className="note__tag__content">{tag.content}</span>
            <button
              className="note__tag__button"
              onClick={() => onTagRemove(note, tag.id)}
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
            onChange={handleTagInputChange}
            placeholder="Add tag"
          />
          <button className="note__tag__new__button" onClick={handleTagAdd}>
            +
          </button>
        </div>
      </div>
      <div className="note__actions">
        <Link to={`/new/${note.id}`} className="note__edit-button">
          Edit
        </Link>
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
