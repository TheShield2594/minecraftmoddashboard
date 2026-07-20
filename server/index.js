import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

app.get('/api/notes', (req, res) => {
  const rows = db.prepare('SELECT mod_id, text FROM notes').all();
  const notes = {};
  for (const row of rows) notes[row.mod_id] = row.text;
  res.json(notes);
});

app.put('/api/notes/:modId', (req, res) => {
  const { modId } = req.params;
  const text = typeof req.body?.text === 'string' ? req.body.text : '';
  if (text.trim() === '') {
    db.prepare('DELETE FROM notes WHERE mod_id = ?').run(modId);
  } else {
    db.prepare(
      'INSERT INTO notes (mod_id, text) VALUES (?, ?) ON CONFLICT(mod_id) DO UPDATE SET text = excluded.text'
    ).run(modId, text);
  }
  res.status(204).end();
});

app.get('/api/progress', (req, res) => {
  const rows = db.prepare('SELECT mod_id, step_index, done FROM progress').all();
  const progress = {};
  for (const row of rows) {
    progress[row.mod_id] ??= {};
    progress[row.mod_id][row.step_index] = Boolean(row.done);
  }
  res.json(progress);
});

app.put('/api/progress/:modId/:stepIndex', (req, res) => {
  const { modId, stepIndex } = req.params;
  const index = Number(stepIndex);
  const done = Boolean(req.body?.done);
  if (!done) {
    db.prepare('DELETE FROM progress WHERE mod_id = ? AND step_index = ?').run(modId, index);
  } else {
    db.prepare(
      'INSERT INTO progress (mod_id, step_index, done) VALUES (?, ?, 1) ON CONFLICT(mod_id, step_index) DO UPDATE SET done = 1'
    ).run(modId, index);
  }
  res.status(204).end();
});

// Static frontend build — skipped in dev, where Vite serves the SPA itself
// and proxies /api to this server (see vite.config.js).
if (process.env.NODE_ENV !== 'development') {
  const distDir = join(__dirname, '..', 'dist');
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(join(distDir, 'index.html'));
  });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`modpack-codex listening on :${port}`);
});
