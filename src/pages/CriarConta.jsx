import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { FaUser, FaAt, FaEnvelope, FaCalendarAlt, FaLock, FaCamera } from 'react-icons/fa';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { criarUsuario } from '../services/usuarioService';
import Layout from '../components/layouts/Layout1';
import InputComIcone from '../components/InputComIcone';

registerLocale('pt-BR', ptBR);

const DEFAULT_AVATAR = '/imagens/avatar_padrao.png';

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
  const [cadastrando, setCadastrando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (previewFoto && previewFoto.startsWith('blob:')) {
        URL.revokeObjectURL(previewFoto);
      }
    };
  }, [previewFoto]);

  const handleSubmit = event => {
    event.preventDefault();
    setCadastrando(true);
    const { nome, username, email, dtNascimento, senha, confirmarSenha } = usuario;

    if (!nome || !username || !email || !dtNascimento || !senha || !confirmarSenha) {
      message.error('Por favor, preencha todos os campos obrigatórios.');
      setCadastrando(false);
      return;
    }

    if (senha !== confirmarSenha) {
      message.error('As senhas não coincidem.');
      setCadastrando(false);
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
      setCadastrando(false);
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

        if (previewFoto && previewFoto.startsWith('blob:')) {
          URL.revokeObjectURL(previewFoto);
        }
        setFoto(null);
        setPreviewFoto(null);

        navigate('/login');
      })
      .catch(err => {
        message.error(err?.response?.data || 'Erro ao cadastrar. Verifique se e-mail ou usuário já estão em uso.');
      })
      .finally(() => {
        setCadastrando(false);
      });
  };

  const toISODate = dateObj =>
    dateObj ? new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : '';

  const selectedDate = usuario.dtNascimento ? new Date(usuario.dtNascimento + 'T00:00:00') : null;

  return (
    <>
      <Layout subtitulo="Criar Conta" />
      <div className="flex flex-col items-center mt-4 px-4 font-poppins">
        <form onSubmit={handleSubmit} className="bg-[#f5dfb6] rounded-xl p-6 w-full max-w-sm shadow-md space-y-4">
          <label className="relative cursor-pointer flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              disabled={cadastrando}
              onChange={e => {
                const file = e.target.files?.[0];
                if (previewFoto && previewFoto.startsWith('blob:')) {
                  URL.revokeObjectURL(previewFoto);
                }
                if (file) {
                  setFoto(file);
                  setPreviewFoto(URL.createObjectURL(file));
                } else {
                  setFoto(null);
                  setPreviewFoto(null);
                }
              }}
              className="hidden"
            />
            <div className="w-28 h-28 bg-[#f8e8af] rounded-full shadow-md border flex items-center justify-center overflow-hidden relative">
              <img
                src={previewFoto || DEFAULT_AVATAR}
                alt="Foto de perfil"
                className="w-full h-full object-cover rounded-full bg-[#f8e8af] [color:transparent] [text-indent:-9999px]"
                loading="lazy"
                disabled={cadastrando}
                draggable={false}
                onError={e => {
                  if (!e.currentTarget.src.includes('avatar_padrao.png')) {
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }
                }}
              />

              {!previewFoto && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <FaCamera className="text-[#5F584E]" size={24} />
                </div>
              )}
            </div>
          </label>

          <InputComIcone
            icone={FaUser}
            type="text"
            value={usuario.nome}
            onChange={e => setUsuario({ ...usuario, nome: e.target.value })}
            placeholder="Nome"
            disabled={cadastrando}
          />

          <InputComIcone
            icone={FaAt}
            type="text"
            value={usuario.username}
            onChange={e => setUsuario({ ...usuario, username: e.target.value })}
            placeholder="Nome de Usuário"
            disabled={cadastrando}
          />

          <InputComIcone
            icone={FaEnvelope}
            type="email"
            value={usuario.email}
            onChange={e => setUsuario({ ...usuario, email: e.target.value })}
            placeholder="E-mail"
            disabled={cadastrando}
          />

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaCalendarAlt className="text-gray-600 mr-3" />
            <DatePicker
              selected={selectedDate}
              onChange={date => setUsuario({ ...usuario, dtNascimento: toISODate(date) })}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data de Nascimento"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale="pt-BR"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
              disabled={cadastrando}
            />
          </div>

          <InputComIcone
            icone={FaLock}
            type="password"
            value={usuario.senha}
            onChange={e => setUsuario({ ...usuario, senha: e.target.value })}
            placeholder="Senha"
            disabled={cadastrando}
          />

          <InputComIcone
            icone={FaLock}
            type="password"
            value={usuario.confirmarSenha}
            onChange={e => setUsuario({ ...usuario, confirmarSenha: e.target.value })}
            placeholder="Confirmar Senha"
            disabled={cadastrando}
          />

          <button
            type="submit"
            className="mt-6 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold py-2 px-6 rounded-full text-lg w-full transition flex items-center justify-center gap-2"
            disabled={cadastrando}
          >
            {cadastrando && (
              <span className="animate-spin border-2 border-t-transparent border-[#f5dfb6] rounded-full w-4 h-4"></span>
            )}
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
};

export default CriarConta;
