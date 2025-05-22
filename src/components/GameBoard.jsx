import EmojiCell from './EmojiCell';

const GameBoard = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <EmojiCell key={index} value={cell} onClick={() => onCellClick(index)} />
      ))}
    </div>
  );
};

export default GameBoard;
// This component renders the game board for the Blink Tac Toe game.