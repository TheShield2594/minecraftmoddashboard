import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MODS } from './data/mods';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ModPage from './pages/ModPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header modCount={MODS.length} />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mod/:modId" element={<ModPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
