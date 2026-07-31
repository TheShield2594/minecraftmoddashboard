import { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { MODS } from '../data/mods';
import { fetchNotes, fetchProgress, saveNote, saveProgressStep } from '../utils/storage';
import ModDetail from '../components/ModDetail';

const NOTE_SAVE_DEBOUNCE_MS = 500;

export default function ModPage() {
  const { modId } = useParams();
  const mod = MODS.find((m) => m.id === modId);
  const [note, setNote] = useState('');
  const [noteStatus, setNoteStatus] = useState('idle'); // idle | saving | saved | error
  const [steps, setSteps] = useState({});
  const saveTimer = useRef(null);
  const pendingSave = useRef(null); // { modId, text } while a debounced save is queued
  const noteDirty = useRef(false);

  useEffect(() => {
    if (!mod) return;
    window.scrollTo(0, 0);
    noteDirty.current = false;
    setNoteStatus('idle');
    fetchNotes().then((notes) => {
      // Don't clobber text the user already started typing while we fetched
      if (!noteDirty.current) setNote(notes[mod.id] || '');
    });
    fetchProgress().then((progress) => setSteps(progress[mod.id] || {}));
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

  function toggleStep(index) {
    setSteps((prev) => {
      const done = !prev[index];
      saveProgressStep(mod.id, index, done);
      return { ...prev, [index]: done };
    });
  }

  return (
    <ModDetail
      mod={mod}
      note={note}
      noteStatus={noteStatus}
      onNoteChange={updateNote}
      steps={steps}
      onToggleStep={toggleStep}
    />
  );
}
