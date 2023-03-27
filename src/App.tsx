import React, { useState } from 'react';
import NoteList from './note-list';
import NoteEditor from './note-editor';
import { NoteType } from './shared/types/note';
import { v4 as uuidv4 } from 'uuid';
import Footer from './footer';
import Header from './header';

const notesTemp: NoteType[] = [
  {
    id: uuidv4(),
    title: 'First note',
    content: 'This is the content of the first note personal thoughts.',
    tags: [
      { id: uuidv4(), content: 'personal' },
      { id: uuidv4(), content: 'thoughts' },
    ],
  },
  {
    id: uuidv4(),
    title: 'Second note',
    content: 'This is the content of the second note work.',
    tags: [
      { id: uuidv4(), content: 'work' },
      { id: uuidv4(), content: 'tasks' },
    ],
  },
  {
    id: uuidv4(),
    title: 'Third note',
    content: 'This is the content of the third note shopping.',
    tags: [{ id: uuidv4(), content: 'shopping' }],
  },
];

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>(notesTemp);

  function handleSubmit() {
    console.log();
  }

  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <main className="main-content">
          {/*<NoteEditor note={notes[0]} onSubmit={handleSubmit} />*/}
          <NoteList notes={notes} setNotes={setNotes} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
