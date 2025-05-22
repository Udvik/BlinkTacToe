const CategorySelector = ({ onSelect, categories }) => {
  return (
    <div className="selector">
      <h2>Select Emoji Categories</h2>
      {[1, 2].map(player => (
        <div key={player}>
          <label>Player {player}: </label>
          <select onChange={(e) => onSelect(player, e.target.value)} defaultValue="">
            <option value="" disabled>Choose</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
