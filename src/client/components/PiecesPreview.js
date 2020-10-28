import React, { memo } from "react";
import BoardPixel from "./BoardPixel";

export default memo(({ pieces }) => (
  <div className="pieces-preview-container">
    <p className="pieces-preview__label game__label">Next:</p>
    <div className="pieces-preview__pieces-container">
      {pieces.map((pieceType, index) => {
        switch (pieceType) {
          case 0:
            return <Piece0 key={index} />;
          case 1:
            return <Piece1 key={index} />;
          case 2:
            return <Piece2 key={index} />;
          case 3:
            return <Piece3 key={index} />;
          case 4:
            return <Piece4 key={index} />;
          case 5:
            return <Piece5 key={index} />;
          case 6:
            return <Piece6 key={index} />;
          default:
            return null;
        }
      })}
    </div>
  </div>
));

const Piece0 = () => (
  <div className="pieces-preview__piece-container pieces-preview__piece-container--0">
    <BoardPixel color={1} />
    <BoardPixel color={1} />
    <BoardPixel color={1} />
    <BoardPixel color={1} />
  </div>
);

const Piece1 = () => (
  <div className="pieces-preview__piece-container">
    <BoardPixel color={2} />
    <div className="board-pixel--00" />
    <div className="board-pixel--00" />
    <BoardPixel color={2} />
    <BoardPixel color={2} />
    <BoardPixel color={2} />
  </div>
);

const Piece2 = () => (
  <div className="pieces-preview__piece-container">
    <div className="board-pixel--00" />
    <div className="board-pixel--00" />
    <BoardPixel color={3} />
    <BoardPixel color={3} />
    <BoardPixel color={3} />
    <BoardPixel color={3} />
  </div>
);

const Piece3 = () => (
  <div className="pieces-preview__piece-container pieces-preview__piece-container--3">
    <BoardPixel color={4} />
    <BoardPixel color={4} />
    <BoardPixel color={4} />
    <BoardPixel color={4} />
  </div>
);

const Piece4 = () => (
  <div className="pieces-preview__piece-container">
    <div className="board-pixel--00" />
    <BoardPixel color={5} />
    <BoardPixel color={5} />
    <BoardPixel color={5} />
    <BoardPixel color={5} />
    <div className="board-pixel--00" />
  </div>
);

const Piece5 = () => (
  <div className="pieces-preview__piece-container">
    <div className="board-pixel--00" />
    <BoardPixel color={6} />
    <div className="board-pixel--00" />
    <BoardPixel color={6} />
    <BoardPixel color={6} />
    <BoardPixel color={6} />
  </div>
);
const Piece6 = () => (
  <div className="pieces-preview__piece-container">
    <BoardPixel color={7} />
    <BoardPixel color={7} />
    <div className="board-pixel--00" />
    <div className="board-pixel--00" />
    <BoardPixel color={7} />
    <BoardPixel color={7} />
  </div>
);
