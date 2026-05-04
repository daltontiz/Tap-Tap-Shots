import { Game } from './types';
import gamesData from './data/games.json';

export const GAMES = gamesData as Game[];

export const CATEGORIES: string[] = ['All', 'Action', 'Arcade', 'Casual', 'Puzzle', 'Sports', 'Strategy'];
