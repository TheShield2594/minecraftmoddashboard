import { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { MODS } from '../data/mods';
import { fetchNotes, fetchProgress, guideKey, saveNote, saveProgressStep } from '../utils/storage';
import ModDetail from '../components/ModDetail';

const NOTE_SAVE_DEBOUNCE_MS = 500;

export default function ModPage() {
  const { modId } = useParams();
  const mod = MODS.find((m) => m.id === modId);
  const [note, setNote] = useState('');
  const [noteStatus, setNoteStatus] = useState('idle'); // idle | saving | saved | error
  // Full progress map, keyed by guideKey — the current mod's checklists and
  // the sidebar mod switcher's fractions both read from it.
  const [progress, setProgress] = useState({});
  const saveTimer = useRef(null);
  const pendingSave = useRef(null); // { modId, text } while a debounced save is queued
  const noteDirty = useRef(false);
  // Toggles made since mount, keyed by guideKey — overlaid onto the fetched
  // progress so a slow fetch can't clobber checkboxes clicked while in flight.
  const localToggles = useRef({});

  useEffect(() => {
    if (!mod) return;
    window.scrollTo(0, 0);
    noteDirty.current = false;
    setNoteStatus('idle');
    fetchNotes().then((notes) => {
      // Don't clobber text the user already started typing while we fetched
      if (!noteDirty.current) setNote(notes[mod.id] || '');
    });
    localToggles.current = {};
    fetchProgress().then((data) => {
      setProgress(() => {
        const merged = { ...data };
        for (const [key, steps] of Object.entries(localToggles.current)) {
          merged[key] = { ...merged[key], ...steps };
        }
        return merged;
      });
    });
    return () => {
      clearTimeout(saveTimer.current);
      // Flush a still-debounced edit instead of dropping it on navigation
      if (pendingSave.current) {
        const { modId: id, text } = pendingSave.current;
        pendingSave.current = null;
        saveNote(id, text);
      }
    };
  }, [mod?.id]);

  if (!mod) return <Navigate to="/" replace />;

  function updateNote(text) {
    setNote(text);
    noteDirty.current = true;
    clearTimeout(saveTimer.current);
    pendingSave.current = { modId: mod.id, text };
    setNoteStatus('saving');
    saveTimer.current = setTimeout(async () => {
      pendingSave.current = null;
      const ok = await saveNote(mod.id, text);
      setNoteStatus(ok ? 'saved' : 'error');
    }, NOTE_SAVE_DEBOUNCE_MS);
  }

  function toggleStep(guideId, index) {
    const key = guideKey(mod.id, guideId);
    // Compute outside the state updater — updaters must stay pure (StrictMode
    // double-invokes them, which would fire duplicate PUTs).
    const done = !progress[key]?.[index];
    saveProgressStep(mod.id, guideId, index, done);
    localToggles.current[key] = { ...localToggles.current[key], [index]: done };
    setProgress((prev) => ({ ...prev, [key]: { ...prev[key], [index]: done } }));
  }

  return (
    <ModDetail
      mod={mod}
      note={note}
      noteStatus={noteStatus}
      onNoteChange={updateNote}
      progress={progress}
      onToggleStep={toggleStep}
    />
  );
}
