import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Tela1 from './pages/Tela1.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tela1 />
  </StrictMode>
);
