// import interfaces
import { GameDto, CreateGameDto, UpdateGameDto, SessionDto, StartSessionRequest, 
         CheckValueRequest, SessionAnswerDto as SessionAnswerDtoInterface,
         SessionAnswerDto} from '../Interfaces/api';


// base URL for backend api
const baseURL = 'http://localhost:5000/api'

// throws on non 200 errors & parses JSON
async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText)
  }
  return res.json()
}

// GamesController 

// getAllGames
export const getAllGames = (): Promise<GameDto[]> =>
  fetch(`${baseURL}/games`)
    .then(handleRes<GameDto[]>)

// getGameById
export const getGameById = (id: number): Promise<GameDto> =>
  fetch(`${baseURL}/games/${id}`)
    .then(handleRes<GameDto>)

// createGame
export const createGame = (dto: CreateGameDto): Promise<GameDto> =>
  fetch(`${baseURL}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then(handleRes<GameDto>)

// updateGame
export const updateGame = (
  id: number,
  dto: UpdateGameDto
): Promise<GameDto> =>
  fetch(`${baseURL}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then(handleRes<GameDto>)

// delete
export const deleteGame = (id: number): Promise<void> =>
  fetch(`${baseURL}/games/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
    })

// SessionController 

// startSession
export const startSession = (
  req: StartSessionRequest
): Promise<SessionDto> =>
  fetch(`${baseURL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  }).then(handleRes<SessionDto>)

// getResult
export const getResults = (
  sessionId: string
): Promise<SessionDto> =>
  fetch(`${baseURL}/sessions/${sessionId}`, {
    method: 'GET',
  }).then(handleRes<SessionDto>)

// nextNumber
export const nextNumber = (
  sessionId: string
): Promise<SessionDto> =>
  fetch(`${baseURL}/sessions/${sessionId}/next`, {
    method: 'GET',
  }).then(handleRes<SessionDto>)

// checkValues
export const checkValues = (
  sessionId: string,
  req: CheckValueRequest
): Promise<SessionAnswerDto> =>
  fetch(`${baseURL}/sessions/${sessionId}/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  }).then(handleRes<SessionAnswerDto>)









