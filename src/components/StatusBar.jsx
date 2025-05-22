const StatusBar = ({ turn, winner, onReset }) => {
  return (
    <div className="status-bar">
      {winner ? (
        <h2>🎉 Player {winner} Wins!</h2>
      ) : (
        <h2>Player {turn}'s Turn</h2>
      )}
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default StatusBar;
