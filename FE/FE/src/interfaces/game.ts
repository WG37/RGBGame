export interface RuleDto { divisor: number; word: string; }
export interface GameDto { id: number; name: string; author: string; rules: RuleDto[]; /* ... */ }
export interface CreateGameDto { name: string; author: string; minRange: number; maxRange: number; rules: RuleDto[]; }
export interface UpdateGameDto extends CreateGameDto {}