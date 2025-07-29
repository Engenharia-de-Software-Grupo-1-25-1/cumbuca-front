import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import './styles/index.css';
import Tela3 from './pages/Tela3.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tela3 />
  </StrictMode>
);
