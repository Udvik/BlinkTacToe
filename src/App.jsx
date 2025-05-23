import { useState } from 'react';
import GameBoard from './components/GameBoard';
import CategorySelector from './components/CategorySelector';
import StatusBar from './components/StatusBar';
import HelpModal from './components/HelpModal';
import './styles.css';

const EMOJI_CATEGORIES = {
  animals: ['🐶', '🐱', '🐵', '🐰'],
  food: ['🍕', '🍟', '🍔', '🍩'],
  sports: ['⚽', '🏀', '🏈', '🎾']
};

function App() {
  const [players, setPlayers] = useState({ 1: '', 2: '' });
  const [score, setScore] = useState({ 1: 0, 2: 0 });
  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [placed, setPlaced] = useState({ 1: [], 2: [] }); // Tracks emoji placements
  const [winner, setWinner] = useState(null);
  const [disabledCells, setDisabledCells] = useState({ 1: null, 2: null });
  const [winningPattern, setWinningPattern] = useState([]); // <-- Add this line
  const [darkMode, setDarkMode] = useState(false);

  const handleCategorySelect = (playerId, category) => {
    setPlayers(prev => ({ ...prev, [playerId]: category }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlaced({ 1: [], 2: [] });
    setWinner(null);
    setDisabledCells({ 1: null, 2: null });
    setTurn(1);
    setWinningPattern([]); // <-- Reset winning pattern
  };

  const handleCellClick = (index) => {
    if (winner || board[index] || disabledCells[turn] === index) return;

    const category = players[turn];
    const emojis = EMOJI_CATEGORIES[category];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const newBoard = [...board];
    newBoard[index] = { emoji: randomEmoji, player: turn };

    const newPlaced = [...placed[turn], { index, emoji: randomEmoji }];
    let updatedPlaced = newPlaced;
    let cellToDisable = disabledCells[turn];

    if (newPlaced.length > 3) {
      const removed = newPlaced.shift(); // remove oldest
      newBoard[removed.index] = null;
      cellToDisable = removed.index;
    }

    setBoard(newBoard);
    setPlaced(prev => ({ ...prev, [turn]: updatedPlaced }));
    setDisabledCells(prev => ({ ...prev, [turn]: cellToDisable }));

    // Check for winner
    const playerPositions = newBoard
      .map((val, i) => (val && val.player === turn ? i : null))
      .filter(i => i !== null);

    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    let foundPattern = null;
    const isWinner = winPatterns.some(pattern => {
      const hasPattern = pattern.every(idx => playerPositions.includes(idx));
      if (hasPattern) foundPattern = pattern;
      return hasPattern;
    });

    if (isWinner) {
      setWinner(turn);
      setScore(prev => ({ ...prev, [turn]: prev[turn] + 1 }));
      setWinningPattern(foundPattern); // <-- Set winning pattern
    } else {
      setTurn(prev => (prev === 1 ? 2 : 1));
    }
  };

  const resetScore = () => setScore({ 1: 0, 2: 0 });

  const readyToPlay = players[1] && players[2];

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <button
          className="dark-toggle-btn"
          onClick={() => setDarkMode(dm => !dm)}
        >
          {darkMode ? '🌙 Dark Mode On' : '☀️ Light Mode'}
        </button>
      </div>
      <h1>Blink Tac Toe</h1>

      {!readyToPlay && (
        <CategorySelector onSelect={handleCategorySelect} categories={Object.keys(EMOJI_CATEGORIES)} />
      )}

      {readyToPlay && (
  <>
    <StatusBar turn={turn} winner={winner} />
    <GameBoard board={board} onCellClick={handleCellClick} winningPattern={winningPattern} />
    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
      <button onClick={resetGame} className="play-again-btn">Play Again</button>
    </div>
  </>
)}
      <div className="scoreboard-gold">
        <span>Player 1: {score[1]}</span>
        <span>Player 2: {score[2]}</span>
        <button onClick={resetScore}>Reset Score</button>
      </div>

      <HelpModal />
    </div>
  );
}

export default App;