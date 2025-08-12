import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaExclamationCircle } from 'react-icons/fa';
import Layout from '../components/layouts/Layout1';
import { novasSenhas } from '../services/recuperarSenhaService';

const NovaSenha = () => {
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let token;

  useEffect(() => {
    const url = new URL(window.location.href);
    if(!token){
      token = url.searchParams.get('token');
    }

    if (token) {
      localStorage.setItem('resetToken', token);
      navigate('/alterar-senha', { replace: true });
      return;
    }

    const hasStored = localStorage.getItem('resetToken');
    if (!hasStored) navigate('/recuperar-senha', { replace: true });
  }, []);

  const handleClick = async () => {
    if (senha1 !== senha2) {
      setError(true);
      return;
    }
    setError(false);

    const token = localStorage.getItem('resetToken');
    if (!token) {
      navigate('/recuperar-senha', { replace: true });
      return;
    }

    try {
      setLoading(true);
      novasSenhas(token,senha1,senha2);

      localStorage.removeItem('resetToken');
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout subtitulo="Nova Senha" />
      <div className="flex flex-col items-center mt-4 px-4">
        <div className="flex flex-col items-center border-b border-gray-400 rounded-xl sm:p-6 w-full max-w-sm shadow-md bg-[#f8e8af]">
          <div className="flex w-full">
            <FaLock className="text-gray-600 mr-3 mt-[10px]" />
            <input
              type="password"
              value={senha1}
              onChange={e => setSenha1(e.target.value)}
              placeholder="Nova senha"
              className={`border-0 border-b-2 border-[#555] pb-2 bg-transparent outline-none text-[1rem] text-[#333] w-full placeholder:text-[#777] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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

          <div className="flex mt-4 w-full">
            <FaLock className="text-gray-600 mr-3 mt-[10px]" />
            <input
              type="password"
              value={senha2}
              onChange={e => setSenha2(e.target.value)}
              placeholder="Confirmar senha"
              className={`border-0 border-b-2 border-[#555] pb-2 bg-transparent outline-none text-[1rem] text-[#333] w-full placeholder:text-[#777] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
          className={`mt-3 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold rounded-full text-lg transition sm:p-3 w-full max-w-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Redefinindo...' : 'Redefinir'}
        </button>
      </div>
    </>
  );
};

export default NovaSenha;
