import React, { useCallback, useEffect, useState } from 'react';
import Note from '../note';
import './style.scss';
import { NoteType, TagType } from '../shared/types/note';
import { v4 as uuidv4 } from 'uuid';
import TagFilter from '../tag-filter';

interface Props {
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

const NoteList: React.FC<Props> = ({ notes, setNotes }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');

  const [activeTagIds, setActiveTagIds] = useState<string[]>([]);

  const handleTagClick = useCallback((tagId: string | null) => {
    if (tagId === null) {
      setActiveTagIds([]);
      return;
    }
    setActiveTagIds((prevState) => {
      if (prevState.includes(tagId)) {
        return prevState.filter((id) => id !== tagId);
      } else {
        return [...prevState, tagId];
      }
    });
  }, []);

  function addNote() {
    const tags: TagType[] = [];
    const noteContent = newNoteContent.replace(/#(\w+)/g, (_, match) => {
      tags.push({ id: uuidv4(), content: match });
      return match;
    });

    const newNote = {
      id: uuidv4(),
      title: newNoteTitle,
      content: noteContent.replace(/#(\w+)/g, '$1'),
      tags: newNoteTags.split(' ').map((tagContent) => {
        const tag: TagType = {
          id: uuidv4(),
          content: tagContent,
        };
        return tag;
      }),
    };

    newNote.tags.push(...tags);

    setNotes([...notes, newNote]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
  }

  function onTagRemove(noteId: string, tagId: string): void {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === noteId) {
          const updatedTags = note.tags.filter((tag) => tag.id !== tagId);
          return { ...note, tags: updatedTags };
        }
        return note;
      });
    });
  }

  function onTagAdd(noteId: string, newTag: string) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              tags: note.tags.concat({
                id: uuidv4(),
                content: newTag,
              }),
            }
          : note
      )
    );
  }

  function onEditNote(id: string) {
    console.log();
  }

  function onDeleteNote(id: string) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  useEffect(() => {
    if (activeTagIds.length > 0) {
      setFilteredNotes(
        notes.filter((note) =>
          note.tags.some((tag) => activeTagIds.includes(tag.id))
        )
      );
    } else {
      setFilteredNotes(notes);
    }
  }, [notes, activeTagIds]);

  return (
    <div className="notes-container">
      <h2 className="notes-title">Notes</h2>
      <div className="notes-form">
        <TagFilter
          tags={Array.from(new Set(notes.flatMap((note) => note.tags)))}
          activeTagIds={activeTagIds}
          onTagSelect={handleTagClick}
        />
      </div>
      <ul className="notes-list">
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onEditNote={onEditNote}
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
