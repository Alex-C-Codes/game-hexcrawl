import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import GamePage               from './pages/GamePage';
import HexmapPage             from './pages/HexmapPage';
import ArticlePage            from './pages/ArticlePage';
import BattlemapPage          from './pages/BattlemapPage';
import CreateHubPage          from './pages/CreateHubPage';
import LibraryPage            from './pages/LibraryPage';
import HexmapEditorPage       from './pages/HexmapEditorPage';
import Navbar                 from './components/Navbar';

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
          <Route path="/"                          element={<GamePage />} />
          <Route path="/hexmap"                    element={<HexmapPage />} />
          <Route path="/article"                   element={<ArticlePage />} />
          <Route path="/create"                    element={<CreateHubPage />} />
          <Route path="/create/battlemap"          element={<BattlemapPage />} />
          <Route path="/create/article"            element={<ArticlePage />} />
          <Route path="/create/hexmap"             element={<HexmapEditorPage />} />
          <Route path="/library"                   element={<LibraryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
