import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import BattlemapPage from './pages/BattlemapPage';
import ArticlePage from './pages/ArticlePage';
import Navbar from './components/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<GamePage />} />
        <Route path="/battlemap" element={<BattlemapPage />} />
        <Route path="/article"   element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout />
    </BrowserRouter>
  );
}
