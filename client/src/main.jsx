import './global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { getAll, getByType, getById, upsert, remove } from './lib/storage';

// Bridge for the legacy vanilla-JS editors (public/hexmap.js, editor.js, settlement.js),
// which are plain <script> tags and can't import ES modules directly.
window.hxStorage = { getAll, getByType, getById, upsert, remove };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
