export const boardWithOnePiece = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 6, 6]
];

export const sampleOpponentBoardActionObj = {
  opponentName: "hugo",
  value: boardWithOnePiece
};

export const sampleOpponentScoreActionObj = {
  opponentName: "hugo",
  value: 1000
};

export const sampleMessages1 = [{ sender: "hugo", message: "hello" }];

export const sampleMessages2 = [{ sender: "axel", message: "salut" }];

export const sampleGameScores = {
  playersHistory: { voltery: 0 },
  scores: { 1: { voltery: 0 } }
};

export const sampleNextPieces = [1, 3, 4];

export const sampleLobbyInfo = {
  players: [
    { name: "voltery", score: 0 },
    { name: "hugo", score: 0 }
  ]
};

export const sampleLobbyInfo2 = {
  players: [
    { name: "hugo", score: 0 },
    { name: "voltery", score: 0 }
  ]
};
