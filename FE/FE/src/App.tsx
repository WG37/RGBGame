import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GameList from './Pages/GameList';
import CreateGamePage from './Pages/CreateGamePage';
import UpdateGamePage from './Pages/UpdateGamePage';
import SessionPage from './Pages/SessionPage';
import HomePage from './Pages/HomePage'; 
import ResultsPage from './Pages/ResultsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/games" element={<GameList />} />
      <Route path="/games/new" element={<CreateGamePage />} />
      <Route path="/games/:id/update" element={<UpdateGamePage />} />
      <Route path="/play/:gameId" element={<SessionPage />} />
      <Route path ="/sessions/:sessionId/results" element={<ResultsPage />} />
      /* redirects paths */
      { <Route path="*" element={<Navigate to="/" replace />} />  }
    </Routes>
  );
}