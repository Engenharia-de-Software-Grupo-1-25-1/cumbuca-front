import React, { useState } from 'react';
import {
  User2 as LuUser2,
  AtSign as LuAtSign,
  Mail as LuMail,
  Calendar as LuCalendar,
  Lock as LuLock
} from 'lucide-react';
import { Camera } from 'lucide-react';
import api from '../services/api';

import Layout from '../components/layouts/Layout1';

const CriarConta = () => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  const handleSubmit = () => {
  if (!nome || !usuario || !email || !dataNascimento || !senha || !confirmarSenha) {
    setMensagemErro('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  if (senha !== confirmarSenha) {
    setMensagemErro('As senhas não coincidem.');
    return;
  }

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  const idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  const dia = hoje.getDate() - nascimento.getDate();

  const idadeValida = idade > 14 || (idade === 14 && (mes > 0 || (mes === 0 && dia >= 0)));

  if (!idadeValida) {
    setMensagemErro('Você precisa ter no mínimo 14 anos para se cadastrar.');
    return;
  }

  setMensagemErro('');

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('usuario', usuario);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('dataNascimento', dataNascimento);

    if (fotoPerfil instanceof File) {
        formData.append('fotoPerfil', fotoPerfil);
    }

    api.post('/usuarios', formData)
        .then(() => {
            setNome('');
            setUsuario('');
            setEmail('');
            setDataNascimento('');
            setSenha('');
            setConfirmarSenha('');
            setFotoPerfil(null);
        })
        .catch((err) => {
            const mensagem = err.response?.data?.message || 'Erro ao cadastrar. Verifique se e-mail ou usuário já estão em uso.';
            setMensagemErro(mensagem);
        });
};

return (
  <>
    <Layout subtitulo="Criar Conta" />
    <div className="flex flex-col items-center mt-4 px-4 font-poppins">
      
      {/* Container da bolinha + formulário */}
      <div className="flex items-center justify-center mt-1 w-full gap-1">

        {/* Upload da Foto de Perfil */}
        <label className="relative cursor-pointer flex-shrink-0 mr-1">
        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
                setFotoPerfil(file);
                setPreviewFoto(URL.createObjectURL(file));
            }
            }}
            className="hidden"
        />

        <div className="w-[140px] h-[140px] bg-[#f8e8af] rounded-full shadow-md border flex items-center justify-center overflow-hidden relative">
            {/* Imagem de perfil */}
            <img
            src={previewFoto || '/imagens/avatar_padrao.png'}
            alt="Foto de perfil"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
                e.target.src = '/imagens/avatar_padrao.png';
            }}
            />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Camera className="w-10 h-10 text-[#5F584E]" />
        </div>
        </div>
        </label>

        {/* Formulário */}
        <div className="flex flex-col gap-6 bg-[#f8e8af] rounded-2xl p-9 w-[550px] h-[470px] shadow-md mr-[10em]">

          {/* Nome */}
          <div className="flex items-center w-full h-[54px]">
            <LuUser2 className="text-[#5F584E] mr-5 self-center w-[44px] h-[44px]" />
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome"
              className="w-full h-full text-[28px] font-light text-[#5F584E] border-0 border-b-2 border-[#555] bg-transparent outline-none placeholder:text-[#5F584E]"
              required
            />
          </div>

          {/* Nome de Usuário */}
          <div className="flex items-center w-full h-[54px]">
            <LuAtSign className="text-[#5F584E] mr-5 self-center w-[44px] h-[44px]" />
            <input
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="Nome de Usuário"
              className="w-full h-full text-[28px] font-light text-[#5F584E] border-0 border-b-2 border-[#555] bg-transparent outline-none placeholder:text-[#5F584E]"
              required
            />
          </div>

          {/* E-mail */}
          <div className="flex items-center w-full h-[54px]">
            <LuMail className="text-[#5F584E] mr-5 self-center w-[44px] h-[44px]" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full h-full text-[28px] font-light text-[#5F584E] border-0 border-b-2 border-[#555] bg-transparent outline-none placeholder:text-[#5F584E]"
              required
            />
          </div>

          {/* Data de Nascimento */}
          <div className="flex items-center w-full h-[54px]">
            <LuCalendar className="text-[#5F584E] mr-5 self-center w-[44px] h-[44px]" />
            <input
              type="date"
              value={dataNascimento}
              onChange={e => setDataNascimento(e.target.value)}

              className="w-full h-full text-[28px] font-light text-[#5F584E] border-0 border-b-2 border-[#555] bg-transparent outline-none placeholder:text-[#5F584E]"
              required
            />
          </div>

          {/* Senha */}
          <div className="flex items-center w-full h-[54px]">
            <LuLock className="text-[#5F584E] mr-5 self-center w-[44px] h-[44px]" />
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Senha"
              className="w-full h-full text-[28px] font-light text-[#5F584E] border-0 border-b-2 border-[#555] bg-transparent outline-none placeholder:text-[#5F584E]"
              required
            />
          </div>

          {/* Confirmar Senha */}
          <div className="flex items-center w-full h-[54px]">
            <LuLock className="text-[#5F584E] mr-5 self-center w-[44px] h-[44px]" />
            <input
              type="password"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              placeholder="Confirmar Senha"
              className="w-full h-full text-[28px] font-light text-[#5F584E] border-0 border-b-2 border-[#555] bg-transparent outline-none placeholder:text-[#5F584E]"
              required
            />
          </div>
        </div>
      </div>

        {/* Mensagem de erro */}
      {mensagemErro && (
        <p className="mt-2 text-red-700 text-lg font-semibold text-center">
          {mensagemErro}
        </p>
      )}

      {/* Botão */}
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-1 w-[600px] h-[85px] bg-[#B62506] text-[#F4E9C3] text-[45px] font-poppins font-semibold rounded-full flex items-center justify-center transition hover:brightness-110"
      >
        Cadastrar
      </button>
    </div>
  </>
);
};

export default CriarConta;
