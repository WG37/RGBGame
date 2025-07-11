import type { RuleDto } from "./RuleDto";

export interface CreateGameDto { 
    name: string; 
    author: string; 
    minRange: number;
    maxRange: number; 
    rules: RuleDto[]; }