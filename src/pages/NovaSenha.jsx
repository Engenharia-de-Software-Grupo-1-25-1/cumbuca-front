import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaExclamationCircle } from 'react-icons/fa';
import Layout from '../components/layouts/Layout1';
import { novasSenhas } from '../services/recuperarSenhaService';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function NovaSenha() {
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    let resetToken;

    const cookieMatch = document.cookie.match(/(^| )resetToken=([^;]+)/);
    if (cookieMatch) resetToken = cookieMatch[2];

    if (!resetToken) resetToken = url.searchParams.get('token');

    if (resetToken) {
      document.cookie = `resetToken=${resetToken}; path=/; max-age=${60 * 30}`;
      navigate('/alterar-senha', { replace: true });
      return;
    }

    if (!resetToken) {
      navigate('/recuperar-senha', { replace: true });
    }
  }, [navigate]);

  const handleClick = async () => {
    if (senha !== confirmacaoSenha) {
      setError(true);
      return;
    }
    setError(false);

    const cookieMatch = document.cookie.match(/(^| )resetToken=([^;]+)/);
    const resetToken = cookieMatch ? cookieMatch[2] : null;

    if (!resetToken) {
      navigate('/recuperar-senha', { replace: true });
      return;
    }
    try {
      setLoading(true);
      await novasSenhas(resetToken, senha, confirmacaoSenha);
      document.cookie = 'resetToken=; path=/; max-age=0';
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout subtitulo="Nova Senha" />
      <div className="flex flex-col items-center mt-4 px-4">
        <div className="bg-[#f5dfb6] rounded-xl p-4 sm:p-6 w-full max-w-sm shadow-md space-y-4">
          <div className="flex items-center border-b border-gray-400 py-2">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Nova senha"
              className={`bg-transparent outline-none w-full text-gray-800 placeholder-gray-600 ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              required
              disabled={loading}
            />
            {loading && (
              <AiOutlineLoading3Quarters
                className="absolute right-0 animate-spin text-[#555]"
                aria-label="Carregando"
                size={18}
              />
            )}
          </div>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              value={confirmacaoSenha}
              onChange={e => setConfirmacaoSenha(e.target.value)}
              placeholder="Confirmar senha"
              className={`bg-transparent outline-none w-full text-gray-800 placeholder-gray-600 ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              required
              disabled={loading}
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
              <FaExclamationCircle className="mr-[0.4rem] text-[0.9rem]" />
              <span>As senhas devem ser iguais</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className={`mt-4 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold py-2 px-6 rounded-full text-lg w-full max-w-sm transition flex items-center justify-center gap-2 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading && (
            <span className="animate-spin border-2 border-t-transparent border-[#f5dfb6] rounded-full w-4 h-4"></span>
          )}
          {loading ? 'Redefinindo...' : 'Redefinir'}
        </button>
      </div>
    </>
  );
}
