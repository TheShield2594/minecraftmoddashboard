import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function Header({ modCount }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isHome = location.pathname === '/';
  const query = searchParams.get('q') || '';
  const searchRef = useRef(null);

  // The input is driven by local state, not searchParams directly —
  // setSearchParams updates inside a transition, so a controlled input bound
  // straight to the URL drops characters during fast typing.
  const [inputValue, setInputValue] = useState(query);

  // Sync from the URL when it changes elsewhere (back/forward navigation),
  // but never clobber text the user is actively typing.
  useEffect(() => {
    if (document.activeElement !== searchRef.current) setInputValue(query);
  }, [query]);

  function onQueryChange(value) {
    setInputValue(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set('q', value);
    else next.delete('q');
    setSearchParams(next, { replace: true });
  }

  // Going back through history restores the home page's search/category
  // params; a deep link with no history falls back to a plain home page.
  function goBack() {
    if (location.key !== 'default') navigate(-1);
    else navigate('/');
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      if (searchRef.current) {
        e.preventDefault();
        searchRef.current.focus();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="header">
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
        <button type="button" className="back-btn" onClick={goBack}>
          ← ALL MODS
        </button>
      )}

      {isHome && (
        <div className="search-wrap">
          <input
            ref={searchRef}
            className="search-input"
            type="search"
            value={inputValue}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search mods, machines, tips...  ( / )"
            aria-label="Search mods"
          />
          {inputValue && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => {
                onQueryChange('');
                searchRef.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>
      )}
    </header>
  );
}
