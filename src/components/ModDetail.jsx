import { CAT_LABELS, catColor, catColorBg, catColorBorder, catIconRadius, catIconClip } from '../data/mods';

const SECTIONS = [
  { id: 'progression', label: 'PROGRESSION' },
  { id: 'machines', label: 'MACHINES & BLOCKS' },
  { id: 'recipes', label: 'KEY RECIPES' },
  { id: 'chains', label: 'RESOURCE CHAINS' },
  { id: 'tips', label: 'TIPS & GOTCHAS' },
  { id: 'notes', label: 'MY NOTES' },
];

export default function ModDetail({ mod, note, onNoteChange }) {
  const color = catColor(mod.category);
  const colorBg = catColorBg(mod.category);
  const colorBorder = catColorBorder(mod.category);

  return (
    <div>
      <div className="mod-hero">
        <span className="corner corner-tl" style={{ borderColor: color }} />
        <span className="corner corner-tr" style={{ borderColor: color }} />
        <span className="corner corner-bl" style={{ borderColor: color }} />
        <span className="corner corner-br" style={{ borderColor: color }} />
        <div
          className="mod-hero-icon"
          style={{
            background: colorBg,
            borderColor: colorBorder,
            color,
            borderRadius: catIconRadius(mod.category),
            clipPath: catIconClip(mod.category),
          }}
        >
          {mod.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="mod-hero-category" style={{ color }}>
            {CAT_LABELS[mod.category]}
          </div>
          <h1 className="mod-hero-name">{mod.name}</h1>
          <div className="mod-hero-desc">{mod.description}</div>
        </div>
      </div>

      <div className="mod-body">
        <div className="mod-nav">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="mod-nav-link">
              {s.label}
            </a>
          ))}
        </div>

        <div className="mod-sections">
          <section id="progression">
            <h2 className="section-title">Progression</h2>
            <div className="progression-list">
              {mod.progression.map((step, i) => (
                <div className="progression-step" key={i}>
                  <div className="progression-index" style={{ borderColor: colorBorder, background: colorBg, color }}>
                    {i + 1}
                  </div>
                  <div className="progression-text">{step}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="machines">
            <h2 className="section-title">Machines &amp; Blocks</h2>
            <div className="machine-grid">
              {mod.machines.map((machine, i) => (
                <div className="panel-block" key={i}>
                  <div className="machine-name">{machine.name}</div>
                  <div className="machine-desc">{machine.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="recipes">
            <h2 className="section-title">Key Recipes</h2>
            <div className="recipe-list">
              {mod.recipes.map((recipe, i) => (
                <div className="panel-block recipe-row" key={i}>
                  <span className="recipe-ingredients">{recipe.ingredients}</span>
                  <span className="recipe-arrow" style={{ color }}>
                    →
                  </span>
                  <span className="recipe-output">{recipe.output}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="chains">
            <h2 className="section-title">Resource Chains</h2>
            <div className="chain-list">
              {mod.resourceChains.map((rc, i) => (
                <div className="panel-block" key={i}>
                  <div className="chain-resource" style={{ color }}>
                    {rc.resource}
                  </div>
                  <div className="chain-text">{rc.chain}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="tips">
            <h2 className="section-title">Tips &amp; Gotchas</h2>
            <div className="tips-list">
              {mod.tips.map((tip, i) => (
                <div className="tip-row" key={i}>
                  <div className="tip-dot" style={{ background: color }} />
                  <div>{tip}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="notes">
            <h2 className="section-title">My Notes</h2>
            <textarea
              className="notes-textarea"
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Add your own tweaks, nerfs, or reminders for this mod in your pack..."
            />
          </section>
        </div>
      </div>
    </div>
  );
}
