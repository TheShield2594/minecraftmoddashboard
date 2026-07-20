import { Link, useLocation, useSearchParams } from 'react-router-dom';

export default function Header({ modCount }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isHome = location.pathname === '/';
  const query = searchParams.get('q') || '';

  function onQueryChange(value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('q', value);
    else next.delete('q');
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="header">
      <Link to="/" className="header-brand">
        <div className="header-logo">&gt;</div>
        <div>
          <div className="header-title">
            MODPACK<span className="accent">.CODEX</span>
            <span className="version-badge">NeoForge · 1.21.1</span>
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
      </Link>

      {!isHome && (
        <Link to="/" className="back-btn">
          ← ALL MODS
        </Link>
      )}

      {isHome && (
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
