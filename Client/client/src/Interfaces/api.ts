// DTOs
export interface GameDto {
    id: number
    name: string
    author: string
    minRange: number
    maxRange: number
    rules: RuleDto[]
};


export interface CreateGameDto {
    name: string
    author: string
    minRange: number
    maxRange: number
    rules : CreateRuleDto[]
};


export interface UpdateGameDto {
    name: string
    author: string
    minRange: number
    maxRange: number
    rules: CreateRuleDto[]
};


export interface RuleDto {
  id: number
  divisor: number
  word: string
};


export interface CreateRuleDto {
  divisor: number
  word: string
};


export interface UpdateRuleDto {
  divisor: number
  word: string
};


export interface SessionDto {
  id: string           // guidd
  gameId: number
  start: string        //  start timestamp
  end?: string | null  //   end timestamp  nulls if in use
  currentNumber: number
  correctTotal: number
  incorrectTotal: number
  answers: SessionAnswerDto[]
};


export interface SessionAnswerDto {
  id: number
  sessionId: string
  number: number
  answerSubmission: string
  expectedAnswer: string
  isCorrect: boolean
};



export interface CheckValueRequest {
    number: number
    answer: string
};


export interface StartSessionRequest {
    gameId: number
};