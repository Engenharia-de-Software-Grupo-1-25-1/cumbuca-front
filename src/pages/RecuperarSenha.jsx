import React from "react";
import Header from "../components/Header1";
import "../styles/RecuperarSenha.css";
import { FaEnvelope } from "react-icons/fa";

function RecuperarSenha() {
  return (
    <div className="recuperar-wrapper">
      <Header />
      <h2 className="subtitulo">Recuperar Senha</h2>
      <div className="recuperar-container">
        <p className="descricao">
          Informe seu e-mail cadastrado para redefinir sua senha
        </p>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="email" placeholder="E-mail" className="email-input" />
        </div>

        <button className="btn-enviar">Enviar</button>
      </div>
    </div>
  );
}

export default RecuperarSenha;
