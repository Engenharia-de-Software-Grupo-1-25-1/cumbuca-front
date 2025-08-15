import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import estabelecimentoIcon from '../../assets/estabelecimentos.svg';
import Icone from '../util/Icone';
import mais from '../../assets/mais.svg';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { MdOutlineComment, MdOutlineStarPurple500 } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';

//Box de Avaliação, recebe uma avaliação e a apresenta em um perfil ou no Feed
//Consegue verificar se o usuário logado é o autor da avaliação para exibir botões de edição e exclusão
//Lida com curtidas
export default function AvalicaoBox({ avaliacao }) {
  const [curtido, setCurtido] = useState(avaliacao.curtido);
  const [nCurtidas, setNCurtidas] = useState(avaliacao.nCurtidas);
  const op = useRef(null);
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  const ehAutor = usuarioLogado?.username === avaliacao.autor.username;

  const handleCurtida = () => {
    if (curtido) {
      setNCurtidas(prev => prev - 1);
    } else {
      setNCurtidas(prev => prev + 1);
    }
    setCurtido(prev => !prev);
  };

  return (
    <div className="bg-[#f7d799] rounded-xl flex flex-col p-4 text-[#1E1E1E] text-2xl gap-4 mt-8">
      {/* Header da Avaliação */}

      <div className="flex gap-4 sm:gap-4 md:gap-8 lg:gap-8 w-full">
        {/* Informações do autor */}

        <div className="flex gap-4 sm:gap-4 md:gap-8 lg:gap-8 flex-col sm:flex-col md:flex-row lg:flex-row">
          <Link to={ehAutor ? '/meuPerfil' : `/${avaliacao.autor.username}`} className="flex-shrink-0">
            <img
              src={avaliacao.autor.fotoDePerfil}
              className="rounded-full hover:brightness-95 transition duration-300 h-auto w-[48px] sm:w-[48px] md:w-[54px] lg:w-[65px]"
              alt={`Foto de perfil de ${avaliacao.autor.nome}`}
            />
          </Link>
          <div>
            <Link
              to={ehAutor ? '/meuPerfil' : `/perfil/${avaliacao.autor.username}`}
              className="flex hover:no-underline flex-wrap"
            >
              <p className="hover:underline mr-4 text-base sm:text-base md:text-xl lg:text-2xl">
                {avaliacao.autor.nome}
              </p>
              <p className="text-sm text-[#505050] sm:text-sm md:text-base lg:text-xl">@{avaliacao.autor.username}</p>
            </Link>

            {/* Nome do estabelecimento */}

            <a href="#" className="flex text-xl items-center gap-1 w-fit">
              <Icone url={estabelecimentoIcon} cor="#356B2A" tamanho="24px" />
              <p className="text-sm text-[#356B2A] sm:text-sm md:text-base lg:text-xl">{avaliacao.estabelecimento}</p>
            </a>
          </div>
        </div>

        {/* Nota da avaliação */}

        <div className="flex items-end self-start ml-auto">
          <MdOutlineStarPurple500
            className="h-auto w-[24px] sm:w-[24px] md:w-[36px] lg:w-[36px] self-baseline"
            color="#FFB115"
            alt="Nota da Avaliação"
          />
          <p className="text-xl sm:text-base md:text-xl lg:text-2xl text-[#FFB115]">{avaliacao.nota}</p>
        </div>

        {/* Botão de mais opções */}

        <button
          className="self-start flex-shrink-0 w-[16px] sm:w-[16px] md:w-[24px] lg:w-[30px]"
          onClick={e => op.current.toggle(e)}
        >
          <img src={mais} alt="Mais opções" className="mt-1" />
        </button>

        {/* OverlayPanel (mais opções) */}

        <OverlayPanel className="border-[#1E1E1E] border bg-[#f7d799] text-[#1E1E1E]" ref={op}>
          <button className="w-full flex items-center gap-2 px-6 py-2">
            <FiEye className="w-[32px] h-[32px]" />
            <p>Detalhar</p>
          </button>
          {ehAutor && (
            <>
              <hr className="border-t-1 border-black w-full" />
              <button className="w-full flex gap-2 items-center px-6 py-2">
                <BiEditAlt className="w-[32px] h-[32px]" />
                <p className="">Editar</p>
              </button>
              <hr className="border-t-1 border-black w-full" />
              <button className="w-full flex gap-2 items-center px-6 py-2">
                <FaRegTrashAlt className="w-[32px] h-[32px]" />
                <p>Excluir</p>
              </button>
            </>
          )}
        </OverlayPanel>
      </div>

      {/* Conteúdo da avaliação */}

      <div>
        <p className="w-[85%] mx-auto text-base sm:text-base md:text-xl lg:text-xl">{avaliacao.descricao}</p>
        {avaliacao.fotoAvaliacao && (
          <img
            src={avaliacao.fotoAvaliacao}
            className="my-4 mx-auto h-[230px] w-[770px] object-cover object-center rounded-xl"
            alt="Foto da avaliação"
          />
        )}
      </div>

      {/* Botões de curtir e comentar */}

      <div className="text-xl mx-8">
        <div className="flex gap-2 mb-2 flex-wrap">
          <button
            className="flex gap-2 items-center text-base sm:text-base md:text-xl lg:text-xl"
            onClick={handleCurtida}
          >
            {curtido ? (
              <FaHeart className="w-[24px] h-[24px]" fill="#C92F0D" alt="Curtir" />
            ) : (
              <FaRegHeart className="w-[24px] h-[24px]" alt="Curtir" />
            )}
            <p>{nCurtidas}</p>
          </button>
          <button className="flex gap-2 items-center text-base sm:text-base md:text-xl lg:text-xl">
            <MdOutlineComment alt="Comentar" className="h-[24px] w-[24px]" />
            <p>{avaliacao.nComentarios}</p>
          </button>

          {/* Data da avaliação */}

          <p className="text-[#505050] text-base sm:text-base md:text-xl lg:text-xl ml-0 sm:ml-0 md:ml-auto lg:ml-auto">
            {avaliacao.data}
          </p>
        </div>

        {/* Tags da avaliação */}

        <div className="flex flex-wrap gap-4">
          {avaliacao.tags.map((tag, index) => (
            <button
              key={index}
              className="px-2 rounded-full text-base"
              style={{
                backgroundColor: tag.corFundo,
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: tag.corDestaque,
              }}
            >
              <p>#{tag.nome}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
