import { isSamePlayer, Player } from './types/player';
import { advantage, deuce, fifteen, forty, FortyData, game, Point, PointsData, Score, thirty } from './types/score';
 import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
 import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string =>
  'You can use pattern matching with switch case pattern.';

export const scoreToString = (score: Score): string =>
  'You can use pattern matching with switch case pattern.';

export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};



export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    matchOpt(
      () => deuce(),
      p => forty(currentForty.player, p) as Score
    )
  );
};



export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};

export const scoreWhenGame = (winner: Player): Score => {
  return game(winner);
};



// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const { PLAYER_ONE, PLAYER_TWO } = current;

  if (winner === 'PLAYER_ONE') {
    return pipe(
      incrementPoint(PLAYER_ONE),
      matchOpt(
        () => forty('PLAYER_ONE', PLAYER_TWO) as Score, 
        (p) => ({ kind: 'POINTS', pointsData: { PLAYER_ONE: p, PLAYER_TWO } }) 
      )
    );
  } else {
    return pipe(
      incrementPoint(PLAYER_TWO),
      matchOpt(
        () => forty('PLAYER_TWO', PLAYER_ONE) as Score, 
        (p) => ({ kind: 'POINTS', pointsData: { PLAYER_ONE, PLAYER_TWO: p } }) 
      )
    );
  }
};

export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};



