
import type { GameDto, CreateGameDto, UpdateGameDto,
  StartSessionRequest, SessionDto, 
  SessionAnswerDto, CheckValueRequest } from '../interfaces';

const API_URL = import.meta.env.VITE_APP_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }
  return response.json();
}

// GamesController
export async function getAllGames(): Promise<GameDto[]> {
  const res = await fetch(`${API_URL}/games`);
  return handleResponse<GameDto[]>(res);
}

export async function getGameById(id: number): Promise<GameDto> {
  const res = await fetch(`${API_URL}/games/${id}`);
  return handleResponse<GameDto>(res);
}

export async function createGame(dto: CreateGameDto): Promise<GameDto> {
  const res = await fetch(`${API_URL}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  return handleResponse<GameDto>(res);
}

export async function updateGame(id: number, dto: UpdateGameDto): Promise<GameDto> {
  const res = await fetch(`${API_URL}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  return handleResponse<GameDto>(res);
}

export async function deleteGame(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/games/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(res.statusText);
}

// SessionController
export async function startSession(req: StartSessionRequest): Promise<SessionDto> {
  const res = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  return handleResponse<SessionDto>(res);
}

export async function getResults(sessionId: string): Promise<SessionDto> {
  const res = await fetch(`${API_URL}/sessions/${sessionId}`);
  return handleResponse<SessionDto>(res);
}

export async function nextNumber(sessionId: string): Promise<Pick<SessionDto, 'currentNumber'>> {
  const res = await fetch(`${API_URL}/sessions/${sessionId}/next`);
  return handleResponse<{ currentNumber: number }>(res);
}

export async function checkValues(
  sessionId: string,
  req: CheckValueRequest
): Promise<SessionAnswerDto> {
  const res = await fetch(`${API_URL}/sessions/${sessionId}/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  return handleResponse<SessionAnswerDto>(res);
}









