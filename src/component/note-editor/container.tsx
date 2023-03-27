import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoteType, TagType } from '../shared/types/note';
import { v4 as uuidv4 } from 'uuid';
import NoteEditor from './component';
import { useAppDispatch, useAppSelector } from '../../features/hooks/redux';
import { noteCreate, noteGetOne, noteUpdate } from './actions';
import { LOADING_STATUSES } from '../../features/constants/redux-state';

const NoteEditorContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((x) => x.notesReducer);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<TagType[]>([]);

  const [tagInput, setTagInput] = useState<string>('');
  const [contentTagInput, setContentTagInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tagsRegExp = new RegExp(
    `\\b(${tags.map((tag) => tag?.content).join('|')})\\b`,
    'gi'
  );

  const highlightedContent =
    tags?.length > 0
      ? content.replace(tagsRegExp, '<mark class="highlight">$1</mark>')
      : content;

  const handleSubmit = async () => {
    const newNote: NoteType = {
      id: id ? id : uuidv4(),
      title,
      content,
      tags,
    };

    if (id) {
      await dispatch(noteUpdate(newNote));
      return;
    }
    await dispatch(noteCreate(newNote));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);

    const input = e.target.value;
    if (input.endsWith('#')) {
      setContentTagInput('#');
    } else if (
      contentTagInput &&
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

  const fetch = useCallback(
    async (id: string) => {
      await dispatch(noteGetOne(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isLoading) {
      if (!id) {
        setIsLoading(false);
      } else {
        fetch(id).catch();
        setIsLoading(false);
      }
    }
  }, [fetch, id, isLoading]);

  useEffect(() => {
    if (notes.loadingStatusGetOne === LOADING_STATUSES.IDLE) {
      setTitle(notes?.note?.title || '');
      setContent(notes?.note?.content || '');
      setTags(notes?.note?.tags || []);
    } else if (notes.loadingStatusGetOne === LOADING_STATUSES.FAILED) {
      navigate('/404');
    }
  }, [
    navigate,
    notes.loadingStatusGetOne,
    notes?.note?.content,
    notes?.note?.tags,
    notes?.note?.title,
  ]);

  useEffect(() => {
    if (!isLoading && notes.loadingStatusEdit === LOADING_STATUSES.IDLE) {
      navigate('/');
    }
  }, [isLoading, navigate, notes.loadingStatusEdit]);

  return (
    <NoteEditor
      title={title}
      content={content}
      tags={tags}
      highlightedContent={highlightedContent}
      tagInput={tagInput}
      handleTagInputChange={handleTagInputChange}
      handleContentInputChange={handleContentInputChange}
      handleTagInputKeyDown={handleTagInputKeyDown}
      handleTagDelete={handleTagDelete}
      handleTitleInputChange={handleTitleInputChange}
      handleSubmit={handleSubmit}
      isCreationMode={!!id}
    />
  );
};

export default NoteEditorContainer;
