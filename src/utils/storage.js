async function getJSON(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

// Resolves true when the server accepted the write, false when the API is
// unreachable or rejected it — callers can surface a "not saved" state.
async function putJSON(url, body) {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// notes shape: { [modId]: text }
export function fetchNotes() {
  return getJSON('/api/notes', {});
}

export function saveNote(modId, text) {
  return putJSON(`/api/notes/${encodeURIComponent(modId)}`, { text });
}

// progress shape: { [guideKey]: { [stepIndex]: true } }
export function fetchProgress() {
  return getJSON('/api/progress', {});
}

// Storage key for one guide's progress. The default guide ('progression')
// uses the bare mod id so progress saved before guides existed still counts.
export function guideKey(modId, guideId) {
  return guideId === 'progression' ? modId : `${modId}/${guideId}`;
}

export function saveProgressStep(modId, guideId, index, done) {
  return putJSON(`/api/progress/${encodeURIComponent(guideKey(modId, guideId))}/${index}`, { done });
}

// Totals across every guide the mod has.
export function progressSummary(mod, progress) {
  let done = 0;
  let total = 0;
  for (const guide of mod.guides) {
    total += guide.steps.length;
    const saved = progress[guideKey(mod.id, guide.id)] || {};
    for (let i = 0; i < guide.steps.length; i++) if (saved[i]) done++;
  }
  return { done, total };
}
