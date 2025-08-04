import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/reset.css';
import './styles/index.css';
import RecuperarSenha from './pages/RecuperarSenha.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecuperarSenha />
  </React.StrictMode>
);
