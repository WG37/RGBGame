export interface SessionAnswerDto { 
    id: string;                                 
    number: number; 
    answerSubmission: string; 
    isCorrect: boolean; 
    expectedAnswer?: string; }