import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { FaUser, FaAt, FaEnvelope, FaCalendarAlt, FaLock, FaCamera } from 'react-icons/fa';
import { criarUsuario } from '../services/usuarioService';
import Layout from '../components/layouts/Layout1';

const CriarConta = () => {
  const [usuario, setUsuario] = useState({
    nome: '',
    username: '',
    email: '',
    dtNascimento: '',
    senha: '',
    confirmarSenha: '',
  });
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    const { nome, username, email, dtNascimento, senha, confirmarSenha } = usuario;

    if (!nome || !username || !email || !dtNascimento || !senha || !confirmarSenha) {
      message.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha !== confirmarSenha) {
      message.error('As senhas não coincidem.');
      return;
    }

    const hoje = new Date();
    const nascimento = new Date(dtNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    const dia = hoje.getDate() - nascimento.getDate();

    const idadeValida = idade > 14 || (idade === 14 && (mes > 0 || (mes === 0 && dia >= 0)));
    if (!idadeValida) {
      message.error('Você precisa ter no mínimo 14 anos para se cadastrar.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('dtNascimento', dtNascimento);
    if (foto instanceof File) {
      formData.append('foto', foto);
    }

    criarUsuario(formData)
      .then(res => {
        message.success(res?.data?.message || 'Conta criada com sucesso!');
        setUsuario({
          nome: '',
          username: '',
          email: '',
          dtNascimento: '',
          senha: '',
          confirmarSenha: '',
        });
        setFoto(null);
        navigate('/login');
      })
      .catch(err => {
        message.error(
          err?.response?.data?.message || 'Erro ao cadastrar. Verifique se e-mail ou usuário já estão em uso.'
        );
      });
  };

  return (
    <>
      <Layout subtitulo="Criar Conta" />
      <div className="flex flex-col items-center mt-4 px-4 font-poppins">
        <form onSubmit={handleSubmit} className="bg-[#f5dfb6] rounded-xl p-6 w-full max-w-sm shadow-md space-y-4">
          <label className="relative cursor-pointer flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setFoto(file);
                  setPreviewFoto(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
            <div className="w-28 h-28 bg-[#f8e8af] rounded-full shadow-md border flex items-center justify-center overflow-hidden relative">
              <img
                src={previewFoto || '/imagens/avatar_padrao.png'}
                alt="Foto de perfil"
                className="w-full h-full object-cover rounded-full"
                onError={e => {
                  e.target.src = '/imagens/avatar_padrao.png';
                }}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaCamera className="text-[#5F584E]" size={24} />
              </div>
            </div>
          </label>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaUser className="text-gray-600 mr-3" />
            <input
              type="text"
              value={usuario.nome}
              onChange={e => setUsuario({ ...usuario, nome: e.target.value })}
              placeholder="Nome"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaAt className="text-gray-600 mr-3" />
            <input
              type="text"
              value={usuario.username}
              onChange={e => setUsuario({ ...usuario, username: e.target.value })}
              placeholder="Nome de Usuário"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaEnvelope className="text-gray-600 mr-3" />
            <input
              type="email"
              value={usuario.email}
              onChange={e => setUsuario({ ...usuario, email: e.target.value })}
              placeholder="E-mail"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaCalendarAlt className="text-gray-600 mr-3" />
            <input
              type="date"
              value={usuario.dtNascimento}
              onChange={e => setUsuario({ ...usuario, dtNascimento: e.target.value })}
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              value={usuario.senha}
              onChange={e => setUsuario({ ...usuario, senha: e.target.value })}
              placeholder="Senha"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              value={usuario.confirmarSenha}
              onChange={e => setUsuario({ ...usuario, confirmarSenha: e.target.value })}
              placeholder="Confirmar Senha"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#B62506] text-[#F4E9C3] text-lg font-semibold rounded-full transition hover:brightness-110"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
};

export default CriarConta;
