import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import Tela2 from './pages/Tela2.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tela2 />
  </StrictMode>
);
