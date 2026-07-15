export default function Header({ view, query, onQueryChange, onGoHome, modCount }) {
  return (
    <div className="header">
      <div className="header-brand" onClick={onGoHome}>
        <div className="header-logo">&gt;</div>
        <div>
          <div className="header-title">
            MODPACK<span className="accent">.CODEX</span>
          </div>
          <div className="header-status">
            <div className="pulse-dot" />
            <div className="header-status-text">
              {modCount} mods loaded<span className="cursor-blink">_</span>
            </div>
            <div className="header-bars">
              <div className="bar bar-1" />
              <div className="bar bar-2" />
              <div className="bar bar-3" />
              <div className="bar bar-4" />
            </div>
          </div>
        </div>
      </div>

      {view === 'mod' && (
        <button className="back-btn" onClick={onGoHome}>
          ← ALL MODS
        </button>
      )}

      {view === 'home' && (
        <input
          className="search-input"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search mods, machines, tips..."
        />
      )}
    </div>
  );
}
