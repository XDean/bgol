import { BoardProps } from 'boardgame.io/react';
import { FC, ReactNode } from 'react';
import { G } from '@/game/tic-tac-toe/game';
import bg from './assets/blackboard.jpg';
import Image from 'next/image';
import clsx from 'clsx';
import { Kalam } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const kalam = Kalam({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const TicTacToeBoard: FC<BoardProps<G>> = (
  {
    ctx,
    G,
    moves,
  },
) => {
  const onClick = (id) => moves.clickCell(id);

  let winner: ReactNode = '';
  if (ctx.gameover) {
    winner = ctx.gameover.winner !== undefined ? (
      <div id="winner">Winner: {ctx.gameover.winner}</div>
    ) : (
      <div id="winner">Draw!</div>
    );
  }

  return (
    <div className={'w-full h-full grid items-center justify-center'}>
      <div className={clsx('relative grid grid-cols-3 p-20 select-none', kalam.className)}>
        <Image
          className={'absolute inset-0 z-[-1]'}
          src={bg}
          alt={'blackboard'}
          layout={'fill'}
          objectFit={'cover'}
        />
        {G.cells.map((e, i) => {
          const empty = e === null;
          return (
            <div
              className={clsx(
                'w-[20vmin] h-[20vmin] aspect-square flex items-center justify-center border',
                'text-white text-[15vmin]',
                empty && 'cursor-pointer hover:bg-[#aaa4] transition',
                !empty && 'cursor-not-allowed',
              )}
              onClick={() => {
                if (empty) {
                  onClick(i);
                }
              }}
            >
              {empty ? null : (e === 0 ? 'O' : 'X')}
            </div>
          );
        })}
      </div>
    </div>
  );
};