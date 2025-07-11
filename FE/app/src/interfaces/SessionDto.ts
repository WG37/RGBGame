import type { SessionAnswerDto } from "./SessionAnswerDto";

export interface SessionDto { 
    id: string; 
    gameId: number; 
    currentNumber: number; 
    answers: SessionAnswerDto[]; 
    correctTotal: number; 
    incorrectTotal: number; }