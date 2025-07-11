import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import GameList from './pages/GameList';
import CreateGamePage from './pages/CreateGamePage';
import UpdateGamePage from './pages/UpdateGamePage';
import SessionPage from './pages/SessionPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GameList />} />
      <Route path="/games/new" element={<CreateGamePage />} />
      <Route path="/games/:id/update" element={<UpdateGamePage />} />
      <Route path="/play/:gameId" element={<SessionPage />} />
      <Route path="/sessions/:sessionId/results" element={<ResultsPage />} />

      {/* Redirect any unknown routes back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}