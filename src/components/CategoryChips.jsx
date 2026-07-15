import { CATEGORIES, catColor, catColorBg, catColorBorder } from '../data/mods';

export default function CategoryChips({ category, onSelect }) {
  return (
    <div className="chip-row">
      {CATEGORIES.map((cat) => {
        const active = cat.key === category;
        const style = {
          background: active ? catColorBg(cat.key) : 'transparent',
          borderColor: active ? catColorBorder(cat.key) : 'oklch(0.35 0.02 260)',
          color: active ? catColor(cat.key) : 'oklch(0.65 0.02 260)',
          fontWeight: active ? 700 : 500,
        };
        return (
          <button key={cat.key} className="chip" style={style} onClick={() => onSelect(cat.key)}>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
