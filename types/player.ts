export type Player = | 'PLAYER_ONE' | 'PLAYER_TWO';
export type PLAYER_ONE = {
    kind: 'PLAYER_ONE';
  };

  export type PLAYER_TWO = {
    kind: 'PLAYER_TWO';
  };
export const isSamePlayer = (p1: Player, p2: Player) => p1 === p2;
