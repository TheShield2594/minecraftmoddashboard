import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { MODS } from '../data/mods';
import { loadNotes, saveNotes, loadProgress, saveProgress } from '../utils/storage';
import ModDetail from '../components/ModDetail';

export default function ModPage() {
  const { modId } = useParams();
  const mod = MODS.find((m) => m.id === modId);
  const [note, setNote] = useState('');
  const [steps, setSteps] = useState({});

  useEffect(() => {
    if (!mod) return;
    window.scrollTo(0, 0);
    setNote(loadNotes()[mod.id] || '');
    setSteps(loadProgress()[mod.id] || {});
  }, [mod?.id]);

  if (!mod) return <Navigate to="/" replace />;

  function updateNote(text) {
    setNote(text);
    saveNotes({ ...loadNotes(), [mod.id]: text });
  }

  function toggleStep(index) {
    setSteps((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      saveProgress({ ...loadProgress(), [mod.id]: next });
      return next;
    });
  }

  return <ModDetail mod={mod} note={note} onNoteChange={updateNote} steps={steps} onToggleStep={toggleStep} />;
}
