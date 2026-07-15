const NOTES_KEY = 'modpack_codex_notes';
const PROGRESS_KEY = 'modpack_codex_progress';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private browsing, quota, etc.) — edits stay in-memory only
  }
}

export function loadNotes() {
  return readJSON(NOTES_KEY, {});
}

export function saveNotes(notes) {
  writeJSON(NOTES_KEY, notes);
}

// progress shape: { [modId]: { [stepIndex]: true } }
export function loadProgress() {
  return readJSON(PROGRESS_KEY, {});
}

export function saveProgress(progress) {
  writeJSON(PROGRESS_KEY, progress);
}

export function progressSummary(mod, progress) {
  const done = Object.values(progress[mod.id] || {}).filter(Boolean).length;
  return { done, total: mod.progression.length };
}
