import { useEffect, useState } from 'react';
import {
  FaLock,
  FaCamera,
  FaArrowLeft,
  FaExclamationTriangle
} from 'react-icons/fa';
import Layout2 from '../components/layouts/Layout2';
import { atualizarPerfil, getPerfil } from '../services/usuarioService';

const EditarPerfil = () => {
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dtNascimento, setDtNascimento] = useState('');

  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      setErro('');
      const resp = await getPerfil();
      if (resp?.sucesso && resp?.data) {
        const { nome, username, email, dtNascimento, fotoUrl } = resp.data;

        setNome(nome || '');
        setUsername(username || '');
        setEmail(email || '');
        setDtNascimento(dtNascimento || '');

        if (fotoUrl) {
          setPreviewFoto(fotoUrl);
        }
      } else {
        setErro(resp?.erro || 'Não foi possível carregar seu perfil.');
      }
      setCarregando(false);
    })();
  }, []);

  const handleAlterarFoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (!nome || !username || !email || !dtNascimento) {
      setErro('Preencha nome, nome de usuário, e-mail e data de nascimento.');
      return;
    }

    const querTrocarSenha = senhaAtual || novaSenha || confirmarNovaSenha;
    if (querTrocarSenha) {
      if (!senhaAtual) return setErro('Informe a senha atual para alterar a senha.');
      if (!novaSenha) return setErro('Informe a nova senha.');
      if (novaSenha !== confirmarNovaSenha) return setErro('A confirmação de senha não confere.');
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('dtNascimento', dtNascimento);
    if (foto instanceof File) formData.append('foto', foto);
    if (querTrocarSenha) {
      formData.append('senhaAtual', senhaAtual);
      formData.append('novaSenha', novaSenha);
    }

    const resp = await atualizarPerfil(formData);
    if (resp?.sucesso) {
      setMensagem('Perfil atualizado com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarNovaSenha('');
    } else {
      setErro(resp?.erro || 'Não foi possível atualizar o perfil.');
    }
  };

  return (
    <>
      <Layout2 subtitulo="Editar Perfil" />
      <div className="flex flex-col items-center px-4 py-6 font-poppins">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4E9C3] mb-6">Editar Perfil</h1>

        <div className="w-full max-w-3xl bg-[#B85B07] rounded-xl shadow-md border border-[#7a3b05] p-6 sm:p-8 relative">
          <button
            type="button"
            className="absolute left-4 top-4 text-[#1f1f1f] hover:opacity-80"
            onClick={() => window.history.back()}
            aria-label="Voltar"
          >
            <FaArrowLeft size={28} />
          </button>

          {carregando ? (
            <div className="text-[#F4E9C3]">Carregando...</div>
          ) : (
            <form onSubmit={handleSalvar} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

              {/* Foto + botão alterar */}
              <div className="col-span-1 flex flex-col items-center sm:items-start gap-3">
                <div className="w-40 h-40 bg-[#d4d4d4] rounded-full overflow-hidden border border-[#7a3b05]">
                  <img
                    src={previewFoto || '/imagens/avatar_padrao.png'}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/imagens/avatar_padrao.png'; }}
                  />
                </div>

                <label className="inline-flex items-center gap-2 bg-[#F4E9C3] text-[#1f1f1f] px-4 py-2 rounded-md cursor-pointer hover:brightness-95">
                  <FaCamera />
                  <span>Alterar foto</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAlterarFoto} />
                </label>
              </div>

              {/* Campos */}
              <div className="col-span-1 flex flex-col gap-4">
                <div>
                  <label className="block text-[#1f1f1f] font-semibold mb-1">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#F4E9C3] rounded-md px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-semibold mb-1">Nome de usuário</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#F4E9C3] rounded-md px-3 py-2 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">E-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F4E9C3] rounded-md px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">Data de nascimento</label>
                    <input
                      type="date"
                      value={dtNascimento}
                      onChange={(e) => setDtNascimento(e.target.value)}
                      className="w-full bg-[#F4E9C3] rounded-md px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                {/* Senhas (opcional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">Senha atual</label>
                    <div className="flex items-center bg-[#F4E9C3] rounded-md px-3">
                      <FaLock className="text-[#5F584E] mr-2" />
                      <input
                        type="password"
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                        placeholder="Senha atual"
                        className="w-full bg-transparent py-2 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1f1f1f] font-semibold mb-1">Nova senha</label>
                    <div className="flex items-center bg-[#F4E9C3] rounded-md px-3">
                      <FaLock className="text-[#5F584E] mr-2" />
                      <input
                        type="password"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        placeholder="Nova senha"
                        className="w-full bg-transparent py-2 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-semibold mb-1">Confirmar nova senha</label>
                  <div className="flex items-center bg-[#F4E9C3] rounded-md px-3">
                    <FaLock className="text-[#5F584E] mr-2" />
                    <input
                      type="password"
                      value={confirmarNovaSenha}
                      onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                      placeholder="Confirmar nova senha"
                      className="w-full bg-transparent py-2 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Mensagens */}
              {erro && (
                <div className="col-span-full text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 flex items-center gap-2">
                  <FaExclamationTriangle /> <span>{erro}</span>
                </div>
              )}
              {mensagem && (
                <div className="col-span-full text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                  {mensagem}
                </div>
              )}

              {/* Ações */}
              <div className="col-span-full flex gap-4 justify-center mt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#B62506] text-[#F4E9C3] text-lg font-semibold rounded-full hover:brightness-110"
                >
                  Salvar
                </button>
                <button type="button" disabled className="px-8 py-3 bg-[#f08a0c] text-[#1f1f1f] text-lg font-semibold rounded-full opacity-60 cursor-not-allowed">
                  Excluir
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

