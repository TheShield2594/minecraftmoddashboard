import { CAT_LABELS, catColor, catColorBg, catColorBorder, catIconRadius, catIconClip } from '../data/mods';

export default function ModCard({ mod, onClick }) {
  const color = catColor(mod.category);
  return (
    <div
      className="mod-card"
      onClick={onClick}
      style={{ '--card-border-hover': catColorBorder(mod.category), '--card-glow': catColorBg(mod.category) }}
    >
      <div className="mod-card-top">
        <div
          className="mod-icon"
          style={{
            background: catColorBg(mod.category),
            borderColor: catColorBorder(mod.category),
            color,
            borderRadius: catIconRadius(mod.category),
            clipPath: catIconClip(mod.category),
          }}
        >
          {mod.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="mod-name">{mod.name}</div>
          <div className="mod-category" style={{ color }}>
            {CAT_LABELS[mod.category]}
          </div>
        </div>
      </div>
      <div className="mod-desc">{mod.description}</div>
    </div>
  );
}
