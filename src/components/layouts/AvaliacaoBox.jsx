import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useAuth } from '../../features/auth/useAuth';
import { MdOutlineStorefront } from 'react-icons/md';
import mais from '../../assets/mais.svg';
// import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';
import { MdOutlineComment, MdOutlineStarPurple500 } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { coresTags } from '../utils/coresTags';
import ModalAvaliacao from '../ModalAvaliacao';
import fotoDePerfilPadrao from '../../assets/fotoDePerfilPadrao.webp';
import ModalAvaliacaoDetalhada from '../ModalAvaliacaoDetalhada';

import { message } from 'antd';
import { removerAvaliacao } from '../../services/avaliacaoService';
import ModalExcluirAvaliacao from '../ModalExcluirAvaliacao';

// Box de Avaliação, recebe uma avaliação e a apresenta em um perfil ou no Feed
// Consegue verificar se o usuário logado é o autor da avaliação para exibir botões de edição e exclusão
// Lida com curtidas
export default function AvalicaoBox({ avaliacao, onChange }) {
  // const [curtido, setCurtido] = useState(avaliacao.curtido);
  // const [qtdCurtidas, setQtdCurtidas] = useState(avaliacao.qtdCurtidas);
  const { user } = useAuth();
  const op = useRef(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalAvaliacaoDetalhada, showModalDetalhar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [deletando, setDeletando] = useState(false);
  const ehAutor = user.id === avaliacao.usuario.id;

  const handleExcluirAvaliacao = async () => {
    try {
      setDeletando(true);
      await removerAvaliacao(avaliacao.id);
      message.success('Avaliação excluída com sucesso.');
      setModalExcluir(false);
      onChange?.();
    } catch (e) {
      message.error(e?.message?.data || 'Erro ao excluir avaliação!');
    } finally {
      setDeletando(false);
    }
  };

  return (
    <div className="bg-[#f7d799] rounded-xl flex flex-col p-4 text-[#1E1E1E] text-2xl gap-4 mb-4">
      <div className="flex gap-4 sm:gap-4 md:gap-8 lg:gap-8 w-full">
        <div className="flex gap-4 sm:gap-4 md:gap-8 lg:gap-8 flex-col sm:flex-col md:flex-row lg:flex-row">
          <Link to={`/perfil/${avaliacao.usuario.username}`} className="flex-shrink-0">
            <img
              src={avaliacao.usuario.foto ? `data:image/jpeg;base64,${avaliacao.usuario.foto}` : fotoDePerfilPadrao}
              className="rounded-full hover:brightness-90 transition duration-300 h-auto w-[48px] sm:w-[48px] md:w-[54px] lg:w-[65px]"
              alt={`Foto de perfil de ${avaliacao.usuario.nome}`}
            />
          </Link>
          <div>
            <Link to={`/perfil/${avaliacao.usuario.username}`} className="flex hover:no-underline flex-wrap">
              <p className="hover:underline mr-4 text-base sm:text-base md:text-xl lg:text-2xl">
                {avaliacao.usuario.nome}
              </p>
              <p className="text-sm text-[#505050] sm:text-sm md:text-base lg:text-xl">@{avaliacao.usuario.username}</p>
            </Link>

            <a
              href={`/estabelecimento/${avaliacao.estabelecimento.id}`}
              className="flex text-xl items-center gap-1 w-fit"
            >
              <MdOutlineStorefront color="#356B2A" size="24" />
              <p className="text-sm text-[#356B2A] sm:text-sm md:text-base lg:text-xl">
                {avaliacao.estabelecimento.nome}
              </p>
            </a>
          </div>
        </div>

        <div className="flex items-end self-start ml-auto">
          <MdOutlineStarPurple500
            className="h-auto w-[24px] sm:w-[24px] md:w-[36px] lg:w-[36px] self-baseline"
            color="#FFB115"
            alt="Nota da Avaliação"
          />
          <p className="text-xl sm:text-base md:text-xl lg:text-2xl text-[#FFB115]">{avaliacao.notaGeral}</p>
        </div>

        <button
          className="self-start flex-shrink-0 w-[16px] sm:w-[16px] md:w-[24px] lg:w-[30px]"
          onClick={e => op.current.toggle(e)}
        >
          <img src={mais} alt="Mais opções" className="mt-1" />
        </button>

        <OverlayPanel className="border-[#1E1E1E] border bg-[#f7d799] text-[#1E1E1E]" ref={op}>
          <button
            className="w-full flex items-center gap-2 px-6 py-2 hover:bg-[#e0b874] transition-colors duration-200"
            onClick={e => {
              showModalDetalhar(true);
              op.current.hide(e);
            }}
          >
            <FiEye className="w-[32px] h-[32px]" />
            <p>Detalhar</p>
          </button>
          {ehAutor && (
            <>
              <hr className="border-t-1 border-black w-full" />
              <button
                className="w-full flex gap-2 items-center px-6 py-2 hover:bg-[#e0b874] transition-colors duration-200"
                onClick={() => {
                  setModalVisivel(true);
                  op.current?.hide();
                }}
              >
                <BiEditAlt className="w-[32px] h-[32px]" />
                <p className="">Editar</p>
              </button>
              <hr className="border-t-1 border-black w-full" />
              <button
                className="w-full flex gap-2 items-center px-6 py-2 hover:bg-[#e0b874] transition-colors duration-200"
                onClick={() => {
                  setModalExcluir(true);
                  op.current?.hide();
                }}
              >
                <FaRegTrashAlt className="w-[32px] h-[32px]" />
                <p>Excluir</p>
              </button>
            </>
          )}
        </OverlayPanel>
      </div>

      <div>
        <p className="w-[85%] mx-auto text-base sm:text-base md:text-xl lg:text-xl">{avaliacao.descricao}</p>
        {avaliacao.fotos && avaliacao.fotos.length > 0 && (
          <img
            src={`data:image/jpeg;base64,${avaliacao.fotos[0]}`}
            className="my-4 mx-auto h-[230px] w-[770px] object-cover object-center rounded-xl"
            alt="Foto da avaliação"
          />
        )}
      </div>

      <div className="text-xl mx-8">
        <div className="flex gap-2 mb-2 flex-wrap">
          <button
            className="flex gap-2 items-center text-base sm:text-base md:text-xl lg:text-xl"
            // onClick={handleCurtida}
          >
            {/* {curtido ? ( */}
            <FaHeart className="w-[24px] h-[24px]" fill="#C92F0D" alt="Curtir" />
            {/* ) : (
                <FaRegHeart className="w-[24px] h-[24px]" alt="Curtir" />
              )} */}
            <p>12</p>
          </button>
          <button className="flex gap-2 items-center text-base sm:text-base md:text-xl lg:text-xl">
            <MdOutlineComment alt="Comentar" className="h-[24px] w-[24px]" />
            <p>1</p>
          </button>

          <p className="text-[#505050] text-base ml-0 sm:ml-0 md:ml-auto lg:ml-auto">
            {new Date(avaliacao.data).toLocaleDateString('pt-BR', {
              timeZone: 'UTC',
            })}
          </p>
        </div>

        {avaliacao.tags && (
          <div className="flex flex-wrap gap-4">
            {avaliacao.tags.map((tag, index) => {
              const cor = coresTags[index % coresTags.length];
              return (
                <button
                  key={index}
                  className="px-2 rounded-full text-base"
                  style={{
                    backgroundColor: cor.corFundo,
                    outlineWidth: '2px',
                    outlineStyle: 'solid',
                    outlineColor: cor.corDestaque,
                  }}
                >
                  <p>#{tag}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {modalVisivel && (
        <ModalAvaliacao
          open={modalVisivel}
          onClose={() => setModalVisivel(false)}
          editar={true}
          avaliacaoId={avaliacao.id}
          onEditSuccess={() => onChange && onChange()}
        />
      )}
      {modalAvaliacaoDetalhada && (
        <ModalAvaliacaoDetalhada idAvaliacao={avaliacao.id} onClose={() => showModalDetalhar(false)} />
      )}

      <ModalExcluirAvaliacao
        open={modalExcluir}
        onCancel={() => setModalExcluir(false)}
        loading={deletando}
        onConfirm={handleExcluirAvaliacao}
      />
    </div>
  );
}
