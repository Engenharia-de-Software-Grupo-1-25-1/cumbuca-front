import React, { useState } from 'react';
import Header from '../components/Header1';
import '../styles/RecuperarSenha.css';
import { FaEnvelope, FaExclamationCircle } from 'react-icons/fa';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleButtonClick = () => {
    const emailMockado = 'tuquinha@gmail.com';
    if (email !== emailMockado) {
      setError(true);
    } else {
      setError(false);
      // seguir o fluxo
    }
  };

  return (
    <div className="recuperar-wrapper">
      <Header />
      <h2 className="subtitulo">Recuperar Senha</h2>
      <div className="recuperar-container">
        <p className="descricao">
          Informe seu e-mail cadastrado para redefinir sua senha
        </p>

        <div className={`input-group`}>
          <FaEnvelope className="icon" />
          <div className="input-area">
            <input
              type="email"
              placeholder="E-mail"
              className="email-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && (
              <div className="erro-msg">
                <FaExclamationCircle className="erro-icon" />
                <span>E-mail não encontrado</span>
              </div>
            )}
          </div>
        </div>

        <button className="btn-enviar" onClick={handleButtonClick}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default RecuperarSenha;
