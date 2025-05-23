import React from 'react';
import '../styles.css'; // Make sure you have this or use styles.css

function GameBoard({ board, onCellClick, winningPattern = [] }) {
  return (
    <div className="game-board">
      {board.map((cell, idx) => (
        <button
          key={idx}
          className={`cell${winningPattern.includes(idx) ? ' cell-win' : ''}`}
          onClick={() => onCellClick(idx)}
        >
          {cell ? cell.emoji : ''}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;
// This component renders the game board for the Blink Tac Toe game.