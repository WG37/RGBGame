import type { RuleDto } from "./RuleDto";

export interface GameDto {
  maxRange: number;
  minRange: number; 
  id: number; 
  name: string; 
  author: string; 
  rules: RuleDto[];
}