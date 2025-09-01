import { useEffect, useState } from 'react';
import { FaLock, FaCamera, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Layout2 from '../components/layouts/Layout2';
import { atualizarPerfil, getUsuarioPorUsername, apagarUsuario } from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import avatarPadrao from '../assets/fotoDePerfilPadrao.webp';
import { logout, verificarSenhaAtual } from '../services/authService';
import { toISODateOnly } from '../utils/date';
import { normalizeFoto } from '../utils/image';
import { message } from 'antd';

const EditarPerfil = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [id, setId] = useState(null);

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dtNascimento, setDtNascimento] = useState('');

  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user?.username) return;

      try {
        setCarregando(true);
        setErro('');

        const resp = await getUsuarioPorUsername(user.username);
        if (resp?.data) {
          const { id, nome, username, email, dtNascimento, foto } = resp.data;
          setId(id);
          setNome(nome || '');
          setUsername(username || '');
          setEmail(email || '');
          setDtNascimento(toISODateOnly(dtNascimento || ''));
          setPreviewFoto(normalizeFoto(foto || null));
          setFoto(null);
        } else {
          setErro(resp?.response.data || 'Não foi possível carregar seu perfil.');
        }
      } catch {
        setErro('Não foi possível carregar seu perfil.');
      } finally {
        setCarregando(false);
      }
    })();
  }, [user?.username]);

  useEffect(() => {
    if (erro) message.error(erro);
  }, [erro]);

  const handleAlterarFoto = e => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const handleDelete = async () => {
    setExcluindo(true);
    if (!id) {
      setErro('Não foi possível identificar o usuário para atualizar.');
      setExcluindo(false);
      return;
    }
    try {
      await apagarUsuario(id);
      message.success('Usuário removido com sucesso!');
      logout();
      navigate('/login');
    } catch {
      message.error('Não foi possível remover o usuário!');
    } finally {
      setExcluindo(false);
    }
  };

  const handleSalvar = async e => {
    e.preventDefault();
    setErro('');
    setSalvando(true);

    if (!id) {
      setErro('Não foi possível identificar o usuário para atualizar.');
      setSalvando(false);
      return;
    }
    if (!nome || !username || !email || !dtNascimento) {
      setErro('Preencha nome, nome de usuário, e-mail e data de nascimento.');
      setSalvando(false);
      return;
    }

    const trocandoSenha = !!(novaSenha?.trim() || confirmarNovaSenha?.trim());

    let senhaParaEnviar = null;
    if (trocandoSenha) {
      if (!senhaAtual?.trim()) {
        setSalvando(false);
        return setErro('Informe a senha atual para alterar a senha.');
      }
      if (!novaSenha?.trim()) {
        setSalvando(false);
        return setErro('Informe a nova senha.');
      }
      if (novaSenha !== confirmarNovaSenha) {
        setSalvando(false);
        return setErro('A confirmação de senha não confere.');
      }

      const ok = await verificarSenhaAtual(user?.username, senhaAtual.trim());
      if (!ok) {
        setSalvando(false);
        return setErro('Senha atual incorreta.');
      }

      senhaParaEnviar = novaSenha.trim();
    } else {
      if (!senhaAtual?.trim()) {
        setSalvando(false);
        return setErro('Para salvar alterações sem trocar a senha, informe sua senha atual.');
      }
      const ok = await verificarSenhaAtual(user?.username || username || email, senhaAtual.trim());
      if (!ok) {
        setSalvando(false);
        return setErro('Senha atual incorreta.');
      }

      senhaParaEnviar = senhaAtual.trim();
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('dtNascimento', dtNascimento);
    if (foto instanceof File) formData.append('foto', foto);

    formData.append('senha', senhaParaEnviar);

    atualizarPerfil(id, formData)
      .then(() => {
        message.success('Perfil atualizado com sucesso!');
        logout();
        navigate('/login');
      })
      .catch(error => {
        message.error(error.response.data || 'Não foi possível atualizar o perfil.');
      })
      .finally(() => {
        setSalvando(false);
      });
  };

  return (
    <>
      <Layout2 subtitulo="Editar Perfil" />
      <div className="flex flex-col items-center px-4 py-6 font-poppins">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4E9C3] mb-6">Editar Perfil</h1>

        <div className="w-full max-w-2xl bg-[#B85B07] rounded-xl shadow-md border border-[#7a3b05] p-5 sm:p-6 relative">
          <button
            type="button"
            className="absolute left-4 top-4 text-[#1f1f1f] hover:opacity-80"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <FaArrowLeft size={28} />
          </button>

          {carregando ? (
            <div className="text-[#F4E9C3]">Carregando...</div>
          ) : (
            <form onSubmit={handleSalvar} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
              <div className="col-span-1 flex flex-col items-center sm:items-center gap-3 self-center">
                <div className="w-36 h-36 sm:w-40 sm:h-40 bg-[#d4d4d4] rounded-full overflow-hidden border border-[#7a3b05]">
                  <img src={previewFoto || avatarPadrao} alt="Foto de perfil" className="w-full h-full object-cover" />
                </div>

                <label className="inline-flex items-center gap-2 bg-[#E9D3AE] text-[#1f1f1f] px-4 py-2 rounded-md cursor-pointer hover:brightness-95">
                  <FaCamera />
                  <span>Alterar foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={salvando || excluindo}
                    onChange={handleAlterarFoto}
                  />
                </label>
              </div>

              <div className="col-span-1 sm:col-span-2 flex flex-col gap-4 sm:pr-1">
                <div>
                  <label className="block text-[#1f1f1f] font-semibold mb-1">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    disabled={salvando || excluindo}
                    onChange={e => setNome(e.target.value)}
                    className="w-full h-11 bg-[#E9D3AE] text-[#1f1f1f] rounded-md px-4 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-semibold mb-1">Nome de usuário</label>
                  <input
                    type="text"
                    value={username}
                    disabled={salvando || excluindo}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full h-11 bg-[#E9D3AE] text-[#1f1f1f] rounded-md px-4 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">E-mail</label>
                    <input
                      type="email"
                      disabled={salvando || excluindo}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full h-11 bg-[#E9D3AE] text-[#1f1f1f] rounded-md px-4 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">Data de nascimento</label>
                    <input
                      type="date"
                      disabled={salvando || excluindo}
                      value={dtNascimento}
                      onChange={e => setDtNascimento(e.target.value)}
                      className="w-full h-11 bg-[#E9D3AE] text-[#1f1f1f] rounded-md px-4 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">Senha atual</label>
                    <div className="flex items-center bg-[#E9D3AE] rounded-md px-3 h-11">
                      <FaLock className="text-[#5F584E] mr-2" />
                      <input
                        type="password"
                        disabled={salvando || excluindo}
                        value={senhaAtual}
                        onChange={e => setSenhaAtual(e.target.value)}
                        placeholder="Senha atual"
                        className="w-full bg-transparent text-[#1f1f1f] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">Nova senha</label>
                    <div className="flex items-center bg-[#E9D3AE] rounded-md px-3 h-11">
                      <FaLock className="text-[#5F584E] mr-2" />
                      <input
                        type="password"
                        value={novaSenha}
                        disabled={salvando || excluindo}
                        onChange={e => setNovaSenha(e.target.value)}
                        placeholder="Nova senha"
                        className="w-full bg-transparent text-[#1f1f1f] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-semibold mb-1">Confirmar nova senha</label>
                  <div className="flex items-center bg-[#E9D3AE] rounded-md px-3 h-11">
                    <FaLock className="text-[#5F584E] mr-2" />
                    <input
                      type="password"
                      disabled={salvando || excluindo}
                      value={confirmarNovaSenha}
                      onChange={e => setConfirmarNovaSenha(e.target.value)}
                      placeholder="Confirmar nova senha"
                      className="w-full bg-transparent text-[#1f1f1f] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full flex gap-4 justify-between mt-1">
                <button
                  type="button"
                  disabled={salvando || excluindo}
                  onClick={handleDelete}
                  className="mt-6 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold py-2 px-6 rounded-full text-lg w-full transition flex items-center justify-center gap-2"
                >
                  {excluindo && (
                    <span className="animate-spin border-2 border-t-transparent border-[#f5dfb6] rounded-full w-4 h-4"></span>
                  )}
                  Excluir
                </button>
                <button
                  type="submit"
                  disabled={salvando || excluindo}
                  className="mt-6 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold py-2 px-6 rounded-full text-lg w-full transition flex items-center justify-center gap-2"
                >
                  {salvando && (
                    <span className="animate-spin border-2 border-t-transparent border-[#f5dfb6] rounded-full w-4 h-4"></span>
                  )}
                  Salvar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
