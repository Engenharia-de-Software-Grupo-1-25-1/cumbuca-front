import React, { useState } from 'react';
import { FaEnvelope, FaExclamationCircle } from 'react-icons/fa';
import Layout from '../components/layouts/Layout1';

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
  <div className="min-h-screen flex flex-col items-center mx-auto text-center">
    <Layout subtitulo='Recuperar Senha'/>

    <div className="text-center max-w-[500px] text-white font-sans">
  
  <p className="text-base text-[#e4e4e4]">
    Informe seu e-mail cadastrado para redefinir sua senha
  </p>

  <div className="bg-[#f8e8af] rounded-[6px] p-4 flex w-full ">
    <FaEnvelope className="text-[#555] text-[1.1rem] self-center"/>

    <div className="flex-1 flex flex-col mt-5">
      <input
        type="email"
        placeholder="E-mail"
        className="border-0 border-b-2 border-[#555] bg-transparent outline-none text-base text-[#333] p-[0.4rem]"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {error && (
        <div className=" items-center text-[#e60000] text-[0.85rem] inline-block mt-5">
          <FaExclamationCircle className="mr-2" />
          <span>E-mail não encontrado</span>
        </div>
      )}
    </div>
  </div>

  <button
    className="w-full bg-[#e60000] hover:bg-[#c20000] text-[1.1rem] rounded-[20px] py-2 transition-colors inline-block mt-2"
    onClick={handleButtonClick}
  >
    Enviar
  </button>
</div>

  </div>
);



};

export default RecuperarSenha;
