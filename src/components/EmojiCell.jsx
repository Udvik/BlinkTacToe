const EmojiCell = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {value ? value.emoji : ''}
    </button>
  );
};

export default EmojiCell;
