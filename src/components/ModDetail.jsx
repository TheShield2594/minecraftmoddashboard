import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MODS,
  catColor,
  catColorBg,
  catColorBorder,
  catIconRadius,
  catIconClip,
  catLabel,
  normalizeStep,
} from '../data/mods';
import { guideKey, progressSummary } from '../utils/storage';

const NOTE_STATUS_TEXT = {
  saving: 'SAVING…',
  saved: 'SAVED ✓',
  error: 'OFFLINE — NOT SAVED',
};

export default function ModDetail({ mod, note, noteStatus, onNoteChange, progress, onToggleStep }) {
  const color = catColor(mod.category);
  const colorBg = catColorBg(mod.category);
  const colorBorder = catColorBorder(mod.category);

  // One nav entry per guide, then the fixed content sections.
  const sections = useMemo(
    () => [
      ...mod.guides.map((g) => ({ id: `guide-${g.id}`, label: g.title.toUpperCase() })),
      { id: 'machines', label: 'MACHINES & BLOCKS' },
      { id: 'recipes', label: 'KEY RECIPES' },
      { id: 'chains', label: 'RESOURCE CHAINS' },
      { id: 'tips', label: 'TIPS & GOTCHAS' },
      { id: 'notes', label: 'MY NOTES' },
    ],
    [mod]
  );

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const offset = 110; // sticky header height + breathing room
    setActiveSection(ids[0]);

    function computeActive() {
      let current = ids[0];
      for (const id of ids) {
        const el = sectionRefs.current[id];
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActiveSection(current);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    }

    computeActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  function stepKeyDown(e, guideId, index) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleStep(guideId, index);
    }
  }

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
            {catLabel(mod.category)}
          </div>
          <h1 className="mod-hero-name">{mod.name}</h1>
          <div className="mod-hero-desc">{mod.description}</div>
          {mod.guideUrl && (
            <a
              className="guide-link"
              href={mod.guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color, borderColor: colorBorder, background: colorBg }}
            >
              FULL GUIDE ON MINECRAFT-GUIDES.COM ↗
            </a>
          )}
        </div>
      </div>

      <div className="mod-body">
        <div className="mod-side">
          <div className="mod-nav">
            {sections.map((s) => {
              const active = activeSection === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`mod-nav-link${active ? ' active' : ''}`}
                  style={active ? { color, background: colorBg } : undefined}
                  onClick={(e) => {
                    // Scroll without pushing a #hash history entry, which would
                    // make the back button step through section jumps.
                    e.preventDefault();
                    sectionRefs.current[s.id]?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {s.label}
                </a>
              );
            })}
          </div>

          <div className="mod-switcher">
            <div className="mod-switcher-title">SWITCH MOD</div>
            {MODS.map((m) => {
              const current = m.id === mod.id;
              const mColor = catColor(m.category);
              const { done, total } = progressSummary(m, progress);
              return (
                <Link
                  key={m.id}
                  to={`/mod/${m.id}`}
                  className={`mod-switcher-link${current ? ' current' : ''}`}
                  style={current ? { color: mColor, background: catColorBg(m.category) } : undefined}
                  aria-current={current ? 'page' : undefined}
                >
                  <span
                    className="mod-switcher-icon"
                    style={{
                      color: mColor,
                      background: catColorBg(m.category),
                      borderColor: catColorBorder(m.category),
                      borderRadius: catIconRadius(m.category),
                      clipPath: catIconClip(m.category),
                    }}
                  >
                    {m.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="mod-switcher-name">{m.name}</span>
                  {done > 0 && (
                    <span className="mod-switcher-progress" style={{ color: mColor }}>
                      {done}/{total}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mod-sections">
          {mod.guides.map((guide) => {
            const saved = progress?.[guideKey(mod.id, guide.id)] || {};
            const doneCount = guide.steps.filter((_, i) => saved[i]).length;
            const sectionId = `guide-${guide.id}`;
            return (
              <section key={guide.id} id={sectionId} ref={(el) => (sectionRefs.current[sectionId] = el)}>
                <div className="section-heading-row">
                  <h2 className="section-title">{guide.title}</h2>
                  <div className="progress-count" style={{ color }}>
                    {doneCount} / {guide.steps.length} COMPLETE
                  </div>
                </div>
                <div className="progression-list">
                  {guide.steps.map(normalizeStep).map((step, i) => {
                    const done = Boolean(saved[i]);
                    return (
                      <div
                        className={`progression-step${done ? ' done' : ''}`}
                        key={i}
                        role="checkbox"
                        aria-checked={done}
                        tabIndex={0}
                        onClick={() => onToggleStep(guide.id, i)}
                        onKeyDown={(e) => stepKeyDown(e, guide.id, i)}
                      >
                        <div
                          className="progression-index"
                          style={{
                            borderColor: colorBorder,
                            background: done ? color : colorBg,
                            color: done ? 'oklch(0.16 0.015 260)' : color,
                          }}
                        >
                          {done ? '✓' : i + 1}
                        </div>
                        <div className="progression-text">
                          <div className="step-title">{step.title}</div>
                          {step.detail && <div className="step-detail">{step.detail}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section id="machines" ref={(el) => (sectionRefs.current.machines = el)}>
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

          <section id="recipes" ref={(el) => (sectionRefs.current.recipes = el)}>
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

          <section id="chains" ref={(el) => (sectionRefs.current.chains = el)}>
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

          <section id="tips" ref={(el) => (sectionRefs.current.tips = el)}>
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

          <section id="notes" ref={(el) => (sectionRefs.current.notes = el)}>
            <div className="section-heading-row">
              <h2 className="section-title">My Notes</h2>
              {NOTE_STATUS_TEXT[noteStatus] && (
                <div className={`note-status${noteStatus === 'error' ? ' note-status-error' : ''}`} role="status">
                  {NOTE_STATUS_TEXT[noteStatus]}
                </div>
              )}
            </div>
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
