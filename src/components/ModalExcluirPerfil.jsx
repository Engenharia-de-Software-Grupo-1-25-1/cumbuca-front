import { useEffect, useRef, useState } from 'react';
import { FiX, FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { apagarUsuario } from '../services/usuarioService';
import { logout, verificarSenhaAtual } from '../services/authService';
import { message } from 'antd';

export default function ModalExcluirConta({ open, onClose, loading = false, idUser, excluindo }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleConfirm = async e => {
    e.preventDefault();
    excluindo?.(true);
    const ok = await verificarSenhaAtual(email.trim(), senha.trim());
    if (!ok) {
      message.error('E-mail ou senha inválidos!');
      excluindo?.(false);
      return;
    }
    if (!idUser) {
      message.error('Não foi possível identificar o usuário para atualizar.');
      excluindo?.(false);
      return;
    }
    try {
      await apagarUsuario(idUser);
      message.success('Usuário removido com sucesso!');
      logout();
      navigate('/login');
    } catch {
      message.error('Não foi possível remover o usuário!');
    } finally {
      excluindo?.(false);
    }
  };

  return (
    <div
      className={open ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4' : 'hidden'}
      onMouseDown={onBackdropClick}
      aria-hidden={!open}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="excluir-title"
        className="relative w-full max-w-[420px] rounded-2xl bg-[#E9D3AE] shadow-xl"
        onMouseDown={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 text-[#3D2E1C] hover:bg-black/5"
          aria-label="Fechar"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="px-6 pt-8 pb-6">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#db520a] text-white">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-600 text-white text-2xl font-bold">
              !
            </div>
          </div>

          <h2 id="excluir-title" className="mb-1 text-center text-2xl font-extrabold text-[#1D1B16]">
            Excluir Conta
          </h2>
          <p className="mb-5 text-center text-sm text-[#2d2a22]/80">
            Para confirmar a exclusão da conta,
            <br /> informe suas credenciais
          </p>

          <form onSubmit={handleConfirm} className="space-y-3">
            <label className="block">
              <span className="sr-only">E-mail</span>
              <div className="flex items-center gap-2 rounded-xl border border-[#e0c796] bg-[#E9D3AE] px-3 py-2">
                <FiMail className="h-4 w-4 text-[#7A6A4C]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="w-full bg-transparent text-sm text-black placeholder-gray-700 outline-none"
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Senha</span>
              <div className="flex items-center gap-2 rounded-xl border border-[#e0c796] bg-[#E9D3AE] px-3 py-2">
                <FiLock className="h-4 w-4 text-[#7A6A4C]" />
                <input
                  type="password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="Senha"
                  className="w-full bg-transparent text-sm text-black placeholder-gray-700 outline-none"
                  autoComplete="current-password"
                  required
                />
              </div>
            </label>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#E6C58D] px-5 py-2.5 text-sm font-semibold text-[#3D2E1C] shadow-inner hover:brightness-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || !email || !senha}
                className="rounded-full bg-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Confirmando...' : 'Confirmar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
