'use client';
import { BoardProps, Client } from 'boardgame.io/react';
import { G, TicTacToe } from './game';
import { TicTacToeBoard } from '@/game/tic-tac-toe/Board';

export const App = Client<G, BoardProps<G>>({
  game: TicTacToe,
  board: TicTacToeBoard,
});
