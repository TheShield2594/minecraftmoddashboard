import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MODS, countsByCategory } from '../data/mods';
import { fetchNotes, fetchProgress, progressSummary } from '../utils/storage';
import CategoryChips from '../components/CategoryChips';
import ModCard from '../components/ModCard';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const [notes, setNotes] = useState({});
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetchNotes().then(setNotes);
    fetchProgress().then(setProgress);
  }, []);

  function setCategory(key) {
    const next = new URLSearchParams(searchParams);
    if (key === 'all') next.delete('category');
    else next.set('category', key);
    setSearchParams(next, { replace: true });
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
      if (m.recipes.some((r) => r.ingredients.toLowerCase().includes(q) || r.output.toLowerCase().includes(q)))
        return true;
      if (m.resourceChains.some((rc) => rc.resource.toLowerCase().includes(q) || rc.chain.toLowerCase().includes(q)))
        return true;
      return false;
    });
  }, [category, q]);

  const counts = useMemo(() => countsByCategory(MODS), []);

  return (
    <div>
      <div className="home-heading">
        <h1>All Mods</h1>
        <div className="result-count" role="status">
          SHOWING {filteredMods.length} / {MODS.length}
        </div>
      </div>

      <CategoryChips category={category} counts={counts} onSelect={setCategory} />

      {filteredMods.length > 0 ? (
        <div className="mod-grid">
          {filteredMods.map((mod) => (
            <ModCard
              key={mod.id}
              mod={mod}
              hasNote={Boolean(notes[mod.id]?.trim())}
              progress={progressSummary(mod, progress)}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div>{q ? `NO MODS MATCH "${query}"` : 'NO MODS IN THIS CATEGORY'}</div>
        </div>
      )}
    </div>
  );
}
