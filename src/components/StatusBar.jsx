const StatusBar = ({ turn, winner }) => {
  return (
    <div className="status-bar">
      {winner ? (
        <h2 className="winner-gold-box">🎉 Player {winner} wins! 🎉</h2>
      ) : (
        <h2>Player {turn}'s Turn</h2>
      )}
    </div>
  );
};

export default StatusBar;