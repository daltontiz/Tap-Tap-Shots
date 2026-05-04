/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: 'Action' | 'Puzzle' | 'Sports' | 'Strategy' | 'Arcade' | 'Casual';
  url: string; // The link to the game (e.g., itch.io embed, poki, or local)
  rating: number;
  isFeatured?: boolean;
}

export type Category = 'All' | Game['category'];
