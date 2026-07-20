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
  const [steps, setSteps] = useState({});
  const saveTimer = useRef(null);

  useEffect(() => {
    if (!mod) return;
    window.scrollTo(0, 0);
    fetchNotes().then((notes) => setNote(notes[mod.id] || ''));
    fetchProgress().then((progress) => setSteps(progress[mod.id] || {}));
    return () => clearTimeout(saveTimer.current);
  }, [mod?.id]);

  if (!mod) return <Navigate to="/" replace />;

  function updateNote(text) {
    setNote(text);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveNote(mod.id, text), NOTE_SAVE_DEBOUNCE_MS);
  }

  function toggleStep(index) {
    setSteps((prev) => {
      const done = !prev[index];
      saveProgressStep(mod.id, index, done);
      return { ...prev, [index]: done };
    });
  }

  return <ModDetail mod={mod} note={note} onNoteChange={updateNote} steps={steps} onToggleStep={toggleStep} />;
}
