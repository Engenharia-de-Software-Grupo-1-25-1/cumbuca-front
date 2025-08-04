import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import RecuperarSenha from './pages/RecuperarSenha.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecuperarSenha />
  </StrictMode>
);
