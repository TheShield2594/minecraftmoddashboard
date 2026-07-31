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

// progress shape: { [modId]: { [stepIndex]: true } }
export function fetchProgress() {
  return getJSON('/api/progress', {});
}

export function saveProgressStep(modId, index, done) {
  return putJSON(`/api/progress/${encodeURIComponent(modId)}/${index}`, { done });
}

export function progressSummary(mod, progress) {
  const done = Object.values(progress[mod.id] || {}).filter(Boolean).length;
  return { done, total: mod.progression.length };
}
