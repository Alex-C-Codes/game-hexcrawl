import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import GamePage from './pages/GamePage';
import BattlemapPage from './pages/BattlemapPage';
import ArticlePage from './pages/ArticlePage';
import EditorPage from './pages/EditorPage';
import Navbar from './components/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"          element={<GamePage />} />
          <Route path="/battlemap" element={<BattlemapPage />} />
          <Route path="/article"   element={<ArticlePage />} />
        </Route>
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
