import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteListContainer from '../../component/note-list/container';
import NoteEditorContainer from '../../component/note-editor/container';
import NotFound from '../../component/not-found/component';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<NotFound />} />
      <Route path="/" element={<NoteListContainer />} />
      <Route path="/new" element={<NoteEditorContainer />} />
      <Route path="/new/:id" element={<NoteEditorContainer />} />
    </Routes>
  );
};

export default AppRoutes;
