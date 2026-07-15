import { catColor, catColorBg, catColorBorder, catIconRadius, catIconClip, catLabel } from '../data/mods';

export default function ModCard({ mod, onClick, hasNote, progress }) {
  const color = catColor(mod.category);
  const showProgress = progress && progress.done > 0;

  return (
    <div
      className="mod-card"
      onClick={onClick}
      style={{ '--card-border-hover': catColorBorder(mod.category), '--card-glow': catColorBg(mod.category) }}
    >
      <div className="mod-card-top">
        <div className="mod-card-heading">
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
              {catLabel(mod.category)}
            </div>
          </div>
        </div>

        {(showProgress || hasNote) && (
          <div className="mod-card-badges">
            {showProgress && (
              <span
                className="badge"
                style={{ color, borderColor: catColorBorder(mod.category), background: catColorBg(mod.category) }}
              >
                {progress.done}/{progress.total}
              </span>
            )}
            {hasNote && (
              <span className="badge badge-note" title="Has notes">
                ✎
              </span>
            )}
          </div>
        )}
      </div>
      <div className="mod-desc">{mod.description}</div>
    </div>
  );
}
