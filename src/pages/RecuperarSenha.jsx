import React, { useState } from 'react';
import { FaEnvelope, FaExclamationCircle } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { recSenha } from '../services/recuperarSenhaService';
import Layout from '../components/layouts/Layout1';
import { useNavigate } from 'react-router-dom';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const ok = await recSenha(email);
      if (ok) {
        setError(false);
        navigate('/login');
      } else {
        setEmail('');
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout subtitulo="Recuperar Senha" />
      <div className="flex flex-col items-center mt-4 px-4">
        <h2 className="mb-5 text-xl">Informe seu e-mail cadastrado para redefinir sua senha</h2>

        <div className="flex flex-col items-center border-b border-gray-400 rounded-xl sm:p-6 w-full max-w-sm shadow-md bg-[#f5dfb6]">
          <div className="relative flex w-full items-center">
            <FaEnvelope className="text-gray-600 mr-3 self-center" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
              disabled={loading}
              className={`border-0 border-b-2 border-[#555] bg-transparent outline-none text-[1rem] text-[#333] w-full placeholder:text-[#777]
                ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              required
            />
            {loading && (
              <AiOutlineLoading3Quarters
                className="absolute right-0 animate-spin text-[#555]"
                aria-label="Carregando"
                size={18}
              />
            )}
          </div>

          {error && !loading && (
            <div className="flex text-[#e60000] text-[0.75rem] self-start mt-2">
              <FaExclamationCircle className="mr-1.5 text-[0.95rem]" />
              <span>E-mail não encontrado</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-3 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold rounded-full text-lg transition sm:p-3 w-full max-w-sm
            ${loading ? 'opacity-70 cursor-not-allowed hover:bg-red-700' : ''}`}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </>
  );
};

export default RecuperarSenha;
