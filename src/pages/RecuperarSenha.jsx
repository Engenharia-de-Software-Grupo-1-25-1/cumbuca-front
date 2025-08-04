import React, { useState } from 'react';
import { FaEnvelope, FaExclamationCircle } from 'react-icons/fa';
import Layout from '../components/layouts/Layout1';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const emailMockado = 'tuquinha@gmail.com';
    if (email !== emailMockado) {
      setError(true);
    } else {
      setError(false);
      // seguir o fluxo
    }
  };

  return (
    <>
      <Layout subtitulo="Recuperar Senha" />
      <div className="flex flex-col items-center mt-4 px-4">
        <h2 className="mb-5 text-xl">Informe seu e-mail cadastrado para redefinir sua senha</h2>
        
        <div className="flex flex-col items-center border-b border-gray-400 bg-[#f5dfb6] rounded-xl  sm:p-6 w-full max-w-sm shadow-md bg-[#f8e8af]">
          <div className='flex'>
            <FaEnvelope className="text-gray-600 mr-3 self-center" />
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
              className="border-0 border-b-2 border-[#555] bg-transparent outline-none text-[1rem] text-[#333] w-full placeholder:text-[#777]"
              required
            />
          </div>
          {error && (
          <div className="flex text-[#e60000] text-[0.65rem] self-start">
            <FaExclamationCircle className="mr-[0.4rem] text-[0.9rem]" />
            <span>E-mail não encontrado</span>
          </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-3  bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold rounded-full text-lg  transition sm:p-3 w-full max-w-sm "
        >
          Enviar
        </button>
      </div>
    </>
  );
};

export default RecuperarSenha;
