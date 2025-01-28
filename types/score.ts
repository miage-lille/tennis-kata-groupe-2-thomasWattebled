import { Player, PLAYER_ONE } from './player';

// Surely not the best choice
export type Point =
  | Love
  | Fifteen
  | Thirty ;

  export type Love = {
    kind: 'LOVE';
  };
  
  export type Fifteen = {
    kind: 'FIFTEEN';
  };
  
  export type Thirty = {
    kind: 'THIRTY';
  };
  
  export const love = (): Love => ({
    kind: 'LOVE',
  });
  
  export const fifteen = (): Fifteen => ({
    kind: 'FIFTEEN',
  });
  
  export const thirty = (): Thirty => ({
    kind: 'THIRTY',
  });
  
  export const playerOne = (): PLAYER_ONE => ({
    kind: 'PLAYER_ONE',
  });

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

const s1: PointsData = { PLAYER_ONE: love(), PLAYER_TWO: love() };
const s2: PointsData = { PLAYER_ONE: fifteen(), PLAYER_TWO: love() };
const s3: PointsData = { PLAYER_ONE: thirty(), PLAYER_TWO: love() };


export type FortyData = {
  player: Player; // The player who have forty points
  otherPoint: Point; // Points of the other player
};







export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export type Deuce = {
  kind: 'DEUCE';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export type Game = {
  kind: 'GAME';
  player: Player;
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export type Score = Points | Forty | Deuce | Advantage | Game;

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {player, otherPoint}
})


export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player: player
})

function pointToString(point: Point) {
  return point.kind
}

function scoreToString(score: Score ){
  return score.kind
}
