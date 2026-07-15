import CategoryChips from './CategoryChips';
import ModCard from './ModCard';

export default function HomeView({ mods, totalCount, query, category, onSelectCategory, onSelectMod }) {
  return (
    <div>
      <div className="home-heading">
        <h1>All Mods</h1>
        <div className="result-count">
          SHOWING {mods.length} / {totalCount}
        </div>
      </div>

      <CategoryChips category={category} onSelect={onSelectCategory} />

      {mods.length > 0 ? (
        <div className="mod-grid">
          {mods.map((mod) => (
            <ModCard key={mod.id} mod={mod} onClick={() => onSelectMod(mod.id)} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div>NO MODS MATCH "{query}"</div>
        </div>
      )}
    </div>
  );
}
