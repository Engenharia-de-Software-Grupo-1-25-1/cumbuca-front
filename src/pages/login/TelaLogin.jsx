import Header from '../../components/Header1';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function TelaLogin() {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center mt-4 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5DFB6] mb-6">
          Login
        </h2>

        <form className="bg-[#f5dfb6] rounded-xl p-4 sm:p-6 w-full max-w-sm shadow-md space-y-4">
          <div className="flex items-center border-b border-gray-400 py-2">
            <FaEnvelope className="text-gray-600 mr-3" />
            <input
              type="text"
              placeholder="E-mail ou Nome de Usuário"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <div className="flex items-center border-b border-gray-400 py-2">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              placeholder="Senha"
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
            />
          </div>

          <div className="text-right text-xs text-gray-600 hover:underline cursor-pointer">
            Esqueceu a senha?
          </div>
        </form>

        <button className="mt-6 bg-red-700 hover:bg-red-800 text-[#f5dfb6] font-bold py-2 px-6 rounded-full text-lg w-full max-w-sm transition">
          Entrar
        </button>

        <p className="mt-4 text-sm text-[#2e3d36]">
          Ainda não tem conta?{' '}
          <a
            href="./cadastro-usuario"
            className="text-sm font-semibold hover:underline"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </>
  );
}

export default TelaLogin;
