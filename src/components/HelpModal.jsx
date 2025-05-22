const HelpModal = () => (
  <div className="help">
    <details>
      <summary>How to Play ❓</summary>
      <ul>
        <li>Choose emoji categories before starting.</li>
        <li>Take turns placing random emojis from your category.</li>
        <li>You can only have 3 emojis on board — oldest disappears when placing the 4th.</li>
        <li>Cannot place an emoji where one just vanished.</li>
        <li>3 in a row wins!</li>
      </ul>
    </details>
  </div>
);

export default HelpModal;
