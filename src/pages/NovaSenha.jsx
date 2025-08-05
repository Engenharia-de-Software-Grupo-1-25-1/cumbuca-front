import React, { useState } from 'react';
import { FaLock, FaExclamationCircle } from 'react-icons/fa';
import Layout from '../components/layouts/Layout1';

const NovaSenha = () => {
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (senha1 !== senha2) {
      setError(true);
    } else {
      setError(false);
      // seguir o fluxo
    }
  };

  return (
    <>
      <Layout subtitulo="Nova Senha" />
      <div className="flex flex-col items-center mt-4 px-4">
        
        <div className="flex flex-col items-center border-b border-gray-400 bg-[#f5dfb6] rounded-xl  sm:p-6 w-full max-w-sm shadow-md bg-[#f8e8af]">
          <div className='flex'>
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              value={senha1}
              onChange={e => setSenha1(e.target.value)}
              placeholder="Nova senha"
              className="border-0 border-b-2 border-[#555] pb-2 bg-transparent outline-none text-[1rem] text-[#333] w-full placeholder:text-[#777]"
              required
            />
          </div>

          <div className='flex mt-4'>
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              value={senha2}
              onChange={e => setSenha2(e.target.value)}
              placeholder="Confirmar senha"
              className=" bg-transparent outline-none text-[1rem] text-[#333] w-full placeholder:text-[#777]"
              required
            />
          </div>

          {error && (
          <div className="flex text-[#e60000] text-[0.65rem] self-start mt-1">
            <FaExclamationCircle className="mr-[0.4rem] text-[0.9rem]" />
            <span>As senhas devem ser iguais</span>
          </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="mt-3  bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold rounded-full text-lg  transition sm:p-3 w-full max-w-sm "
        >
          Redefinir
        </button>
      </div>
    </>
  );
};

export default NovaSenha;
