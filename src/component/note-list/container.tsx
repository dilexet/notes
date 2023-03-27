import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../features/hooks/redux';
import { selectAll } from '../../features/reducer/notes';
import { NoteType, TagType } from '../shared/types/note';
import { noteUpdate } from '../note-editor/actions';
import { noteRemove, notesGetAll } from './actions';
import NoteList from './component';

const NoteListContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAll);

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = useCallback(
    async (tagIds: string[] | null) => {
      await dispatch(notesGetAll(tagIds));
    },
    [dispatch]
  );

  const handleTagClick = useCallback(
    async (tagContent: string | null) => {
      if (tagContent === null) {
        await fetchNotes(null);
        setActiveTags([]);
        return;
      }
      let tagContents = activeTags;
      if (tagContents.includes(tagContent)) {
        tagContents = tagContents.filter((id) => id !== tagContent);
      } else {
        tagContents = [...tagContents, tagContent];
      }
      await fetchNotes(tagContents);
      setActiveTags(tagContents);
    },
    [activeTags, fetchNotes]
  );

  const onTagRemove = async (note: NoteType, tagId: string) => {
    const newNote: NoteType = {
      ...note,
      tags: note.tags.filter((tag) => tag.id !== tagId),
    };
    await dispatch(noteUpdate(newNote));
  };

  const onTagAdd = async (note: NoteType, newTagContent: string) => {
    const newTag: TagType = { id: uuidv4(), content: newTagContent };
    const newNote: NoteType = {
      ...note,
      tags: [...note.tags, newTag],
    };
    await dispatch(noteUpdate(newNote));
  };

  const onDeleteNote = async (id: string) => {
    await dispatch(noteRemove(id));
  };

  useEffect(() => {
    if (isLoading) {
      fetchNotes(null).catch();
      setIsLoading(false);
    }
  }, [fetchNotes, isLoading]);

  return (
    <NoteList
      notes={notes}
      activeTags={activeTags}
      handleTagClick={handleTagClick}
      onDeleteNote={onDeleteNote}
      onTagRemove={onTagRemove}
      onTagAdd={onTagAdd}
    />
  );
};

export default NoteListContainer;
