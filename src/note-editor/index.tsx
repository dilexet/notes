import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { NoteType, TagType } from '../shared/types/note';
import './style.scss';

interface NoteFormProps {
  note?: NoteType;
  onSubmit: (note: NoteType) => void;
}

const NoteEditor: React.FC<NoteFormProps> = ({ note, onSubmit }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [tags, setTags] = useState<TagType[]>(note ? note.tags : []);
  const [tagInput, setTagInput] = useState('');
  const [contentTagInput, setContentTagInput] = useState('');

  const handleSubmit = () => {
    const newNote: NoteType = {
      id: note ? note.id : uuidv4(),
      title,
      content,
      tags,
    };
    onSubmit(newNote);
    navigate('/');
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleContentInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);

    const input = e.target.value;
    if (input.endsWith('#')) {
      setContentTagInput('#');
    } else if (
      contentTagInput.startsWith('#') &&
      /\s|\W/.test(input.slice(-1))
    ) {
      const contentTag = contentTagInput.replace('#', '').trim();
      if (contentTag) {
        setTags((prevTags) => [
          ...prevTags,
          { id: uuidv4(), content: contentTag },
        ]);
        setContent((prevContent) => prevContent.replace(/#(\w+)/g, '$1'));
      }
      setContentTagInput('');
    } else {
      setContentTagInput((prevInput) => prevInput + input.slice(-1));
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && tagInput.trim()) {
      const newTag: TagType = {
        id: uuidv4(),
        content: tagInput.trim(),
      };
      setTags((prevState) => [...prevState, newTag]);
      setTagInput('');
    }
  };

  const handleTagDelete = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  useEffect(() => {
    if (!note) {
      setTitle('');
      setContent('');
      setTags([]);
      setTagInput('');
    }
  }, [note]);

  const tagsRegExp = new RegExp(
    `\\b(${tags.map((tag) => tag.content).join('|')})\\b`,
    'gi'
  );

  const highlightedContent = content.replace(
    tagsRegExp,
    '<mark class="highlight">$1</mark>'
  );

  return (
    <div className="note-form">
      <div className="notes-inputs">
        <label className="notes-inputs__label">
          Title:
          <input
            className="notes-inputs__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
      <button className="note-form__submit" onClick={handleSubmit}>
        {note ? 'Save' : 'Create'}
      </button>
    </div>
  );
};

export default NoteEditor;
