import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
// Loaded after the component styles so the breakpoint helpers (.only-mobile, .only-desktop) win.
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
