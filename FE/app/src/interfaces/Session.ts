export interface StartSessionRequest { gameId: number; }

export interface SessionAnswerDto { id: string; 
                                    number: number; 
                                    answerSubmission: string; 
                                    isCorrect: boolean; 
                                    expectedAnswer?: string; }

export interface SessionDto { id: string; 
                              gameId: number; 
                              currentNumber: number; 
                              answers: SessionAnswerDto[]; 
                              correctTotal: number; 
                              incorrectTotal: number; }

export interface CheckValueRequest { number: number; answer: string; }