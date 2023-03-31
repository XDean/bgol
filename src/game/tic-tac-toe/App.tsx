'use client'
import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game';

export const App = Client({game: TicTacToe});
