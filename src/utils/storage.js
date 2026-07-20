async function getJSON(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

async function putJSON(url, body) {
  try {
    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // API unreachable — edit stays in local state only until the next reload
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
