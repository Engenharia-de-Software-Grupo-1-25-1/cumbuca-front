import { useState } from 'react';
import { message } from 'antd';
import Layout from '../components/layouts/Layout1';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../features/auth/useAuth';
import InputComIcone from '../components/InputComIcone';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logando, setLogando] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setLogando(true);
    try {
      await login(email, senha);
    } catch (err) {
      message.error('Falha no login');
      console.error(err);
    } finally {
      setLogando(false);
    }
  };

  return (
    <>
      <Layout subtitulo="Login" />

      <div className="flex flex-col items-center mt-4 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-[#f5dfb6] rounded-xl p-4 sm:p-6 w-full max-w-sm shadow-md space-y-4"
        >
          <InputComIcone
            icone={FaEnvelope}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail ou Nome de Usuário"
            required
          />

          <InputComIcone
            icone={FaLock}
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Senha"
            required
          />

          <div className="text-right text-xs text-gray-600 hover:underline cursor-pointer">
            <a href="./recuperar-senha"> Esqueceu a senha?</a>
          </div>

          <button
            type="submit"
            className="mt-6 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold py-2 px-6 rounded-full text-lg w-full transition flex items-center justify-center gap-2"
            disabled={logando}
          >
            {logando && (
              <span className="animate-spin border-2 border-t-transparent border-[#f5dfb6] rounded-full w-4 h-4"></span>
            )}
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-[#2e3d36]">
          {'Ainda não tem conta? '}
          <a href="./cadastrar-usuario" className="text-sm font-semibold hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </>
  );
}
