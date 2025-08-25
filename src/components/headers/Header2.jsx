import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import cumbucaLogo from '../../assets/logo.svg';
import { MdOutlineLogout } from 'react-icons/md';
import { IoSearch, IoClose } from 'react-icons/io5';
import { FiFilter } from 'react-icons/fi';
import BarraDePesquisa from './BarraDePesquisa';
import { useAuth } from '../../features/auth/useAuth';
import ModalAvaliacao from '../ModalAvaliacao';

//Padrão de Header com logo com título, barra de pesquisa expansível, botão de filtrar e botão de sair
function Header({ placeholder }) {
  const [mostrarPesquisa, setMostrarPesquisa] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const { logout } = useAuth();
  const { user } = useAuth();
  const location = useLocation();

  const alternarPesquisa = () => {
    setMostrarPesquisa(prev => !prev);
  };

  const mostrarBotaoNovaAvaliacao = location.pathname === '/feed';
  const mostrarBotoesPesquisaEFiltro = !location.pathname.startsWith(`/perfil/${user.username}`);

  return (
    <header
      className="
        flex justify-between
        bg-[url('../assets/fundo_header.svg')] bg-cover bg-center
        border-b-[0.5em] border-b-[#db520a]
        h-[10%]
        px-2 py-4 sm:px-2 md:px-8 lg:px-20
        gap-4
        items-center
      "
    >
      <a href="/" className="flex items-center gap-4 ml-[0em] sm:ml-[0em] md:ml-[0em] lg:ml-[4em]">
        <img
          src={cumbucaLogo}
          alt="Logo da Cumbuca"
          className="
            h-12 sm:h-12 md:h-16 w-auto
            will-change-transform
            transition-filter duration-300
            hover:scale-110 hover:transition-transform hover:duration-200
          "
        />
        {!mostrarPesquisa && (
          <h1
            className="
          text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-[#f5dfb6]
          hidden sm:hidden md:block lg:block"
          >
            CUMBUCA
          </h1>
        )}
      </a>

      {mostrarPesquisa && <BarraDePesquisa placeholder={placeholder} />}

      <div className="flex gap-1 sm:gap-1 md:gap-4 lg:gap-4">
        {mostrarBotoesPesquisaEFiltro && (
          <>
            <button className="flex-shrink-0" onClick={alternarPesquisa}>
              {mostrarPesquisa ? (
                <IoClose className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px] h-auto" alt="Fechar pesquisa" />
              ) : (
                <IoSearch className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px] h-auto" alt="Pesquisar" />
              )}
            </button>
            <button className="flex-shrink-0">
              <FiFilter className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px] h-auto" alt="Filtrar" />
            </button>
          </>
        )}

        {mostrarBotaoNovaAvaliacao && (
          <button
            onClick={() => setModalVisivel(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold bg-[#db520a] hover:bg-[#c7470a] text-[#f5dfb6] shadow transition-colors"
          >
            <FiPlus className="h-5 w-5" />
            <span>Nova Avaliação</span>
          </button>
        )}

        <button className="flex-shrink-0" onClick={logout}>
          <MdOutlineLogout className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px] h-auto" alt="Sair" />
        </button>
      </div>
      {modalVisivel && <ModalAvaliacao open={modalVisivel} onClose={() => setModalVisivel(false)} />}
    </header>
  );
}

export default Header;
