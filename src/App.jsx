import { useEffect, useMemo, useState } from 'react';
import { MODS } from './data/mods';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ModDetail from './components/ModDetail';

const NOTES_KEY = 'modpack_codex_notes';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [notes, setNotes] = useState({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
      setNotes(saved);
    } catch {
      // ignore malformed local storage contents
    }
  }, []);

  function goHome() {
    setView('home');
    setSelectedId(null);
  }

  function selectMod(id) {
    setSelectedId(id);
    setView('mod');
    window.scrollTo(0, 0);
  }

  function updateNote(id, text) {
    setNotes((prev) => {
      const next = { ...prev, [id]: text };
      try {
        localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable; keep in-memory state only
      }
      return next;
    });
  }

  const q = query.trim().toLowerCase();
  const filteredMods = useMemo(() => {
    return MODS.filter((m) => {
      if (category !== 'all' && m.category !== category) return false;
      if (!q) return true;
      if (m.name.toLowerCase().includes(q)) return true;
      if (m.description.toLowerCase().includes(q)) return true;
      if (m.category.toLowerCase().includes(q)) return true;
      if (m.machines.some((x) => x.name.toLowerCase().includes(q))) return true;
      if (m.tips.some((t) => t.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [category, q]);

  const selectedMod = MODS.find((m) => m.id === selectedId) || null;

  return (
    <div className="app-shell">
      <Header view={view} query={query} onQueryChange={setQuery} onGoHome={goHome} modCount={MODS.length} />

      <div className="app-content">
        {view === 'home' && (
          <HomeView
            mods={filteredMods}
            totalCount={MODS.length}
            query={query}
            category={category}
            onSelectCategory={setCategory}
            onSelectMod={selectMod}
          />
        )}

        {view === 'mod' && selectedMod && (
          <ModDetail
            mod={selectedMod}
            note={notes[selectedMod.id] || ''}
            onNoteChange={(text) => updateNote(selectedMod.id, text)}
          />
        )}
      </div>
    </div>
  );
}
