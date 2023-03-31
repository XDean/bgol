import { Game } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

export type G = {
  cells: (0 | 1 | null)[]
}

export const TicTacToe: Game<G> = {
  setup: () => ({
    cells: Array(9).fill(null),
  }),
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  moves: {
    clickCell: ({G, playerID}, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = Number(playerID);
    },
  },
  endIf: ({G, ctx}) => {
    if (isVictory(G)) {
      return {winner: ctx.currentPlayer};
    }
    if (isDraw(G)) {
      return {draw: true};
    }
  },
  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({move: 'clickCell', args: [i]});
        }
      }
      return moves;
    },
  },
};

function isVictory(g: G) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
  ];
  const isRowComplete = row => {
    const symbols = row.map(i => g.cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

function isDraw(g: G) {
  return g.cells.filter(c => c === null).length === 0;
}