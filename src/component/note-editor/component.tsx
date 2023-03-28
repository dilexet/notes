import React from 'react';
import { NoteEditorComponentProps } from './props';
import './style.scss';

const NoteEditor: React.FC<NoteEditorComponentProps> = ({
  title,
  content,
  tags,
  highlightedContent,
  tagInput,
  handleTagInputChange,
  handleContentInputChange,
  handleTagInputKeyDown,
  handleTagDelete,
  handleTitleInputChange,
  handleSubmit,
  isCreationMode,
  isEdit,
}) => {
  return (
    <div className="note-form">
      <div className="notes-inputs">
        <label className="notes-inputs__label">
          Title:
          <input
            className="notes-inputs__input"
            type="text"
            value={title}
            onChange={handleTitleInputChange}
          />
        </label>
        <label className="notes-inputs__label">
          Content (use `#` to add tag):
          <textarea
            className="notes-inputs__input content"
            rows={6}
            cols={30}
            value={content}
            onChange={handleContentInputChange}
          />
          <div
            className="notes-inputs__content"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
        </label>
        <label className="notes-inputs__label">
          Tags (separated by space):
          <input
            className="notes-inputs__input"
            type="text"
            placeholder="Add tag..."
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
        </label>
      </div>
      <div className="note-form__tag-list">
        {tags.map((tag) => (
          <div className="note-form__tag" key={tag.id}>
            <span>{tag.content}</span>
            <button
              className="note-form__tag-delete"
              onClick={() => handleTagDelete(tag.id)}
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
      <button
        className="note-form__submit"
        disabled={isEdit}
        onClick={handleSubmit}
      >
        {isCreationMode ? 'Create' : 'Save'}
      </button>
    </div>
  );
};

export default NoteEditor;
