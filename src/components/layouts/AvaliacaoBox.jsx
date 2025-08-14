import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import estabelecimentoIcon from '../../assets/estabelecimentos.svg';
import Icone from '../util/Icone';
import mais from '../../assets/mais.svg';
import estrela from '../../assets/estrelaBox.svg';
import curtir from '../../assets/curtir.svg';
import curtirVermelho from '../../assets/curtirVermelho.svg';
import comentar from '../../assets/comentar.svg';
import excluir from '../../assets/excluirAvaliacao.svg';
import editar from '../../assets/editarAvaliacao.svg';
import detalhar from '../../assets/detalhar.svg';

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
      <div className="flex gap-8">
        <Link to={`/perfil/${avaliacao.autor.username}`}>
          <img
            src={avaliacao.autor.fotoDePerfil}
            className="h-[65px] rounded-full hover:brightness-95 transition duration-300"
            alt={`Foto de perfil de ${avaliacao.autor.nome}`}
          />
        </Link>
        <div>
          <Link to={`/perfil/${avaliacao.autor.username}`} className="flex gap-4 hover:no-underline">
            <p className="hover:underline">{avaliacao.autor.nome}</p>
            <p className="text-xl text-[#505050]">@{avaliacao.autor.username}</p>
          </Link>
          <a href="#" className="flex text-xl items-center gap-1">
            <Icone url={estabelecimentoIcon} cor="#356B2A" tamanho="24px" />
            <p className="text-xl text-[#356B2A]">{avaliacao.estabelecimento}</p>
          </a>
        </div>
        <div className="flex items-end self-start ml-auto">
          <img src={estrela} className="w-[48px] self-baseline" alt="Nota da Avaliação" />
          <p className="text-3xl text-[#FFB115]">{avaliacao.nota}</p>
        </div>
        <button className="self-start" onClick={e => op.current.toggle(e)}>
          <img src={mais} alt="Mais opções" className="mt-1" />
        </button>
        <OverlayPanel className="border-[#1E1E1E] border bg-[#f7d799] text-[#1E1E1E]" ref={op}>
          <button className="w-full flex items-center gap-2 px-6 py-2">
            <img src={detalhar} className="w-[32px]" />
            <p>Detalhar</p>
          </button>
          {ehAutor && (
            <>
              <hr className="border-t-1 border-black w-full" />
              <button className="w-full flex gap-2 items-center px-6 py-2">
                <img src={editar} className="w-[32px]" />
                <p className="">Editar</p>
              </button>
              <hr className="border-t-1 border-black w-full" />
              <button className="w-full flex gap-2 items-center px-6 py-2">
                <img src={excluir} className="w-[32px]" />
                <p>Excluir</p>
              </button>
            </>
          )}
        </OverlayPanel>
      </div>

      <div>
        <p className="w-[85%] mx-auto">{avaliacao.descricao}</p>
        {avaliacao.fotoAvaliacao && (
          <img
            src={avaliacao.fotoAvaliacao}
            className="my-4 mx-auto h-[230px] w-[770px] object-cover object-center rounded-xl"
            alt="Foto da avaliação"
          />
        )}
      </div>

      <div className="text-xl mx-8">
        <div className="flex gap-2 mb-1">
          <button className="flex gap-2 items-center" onClick={handleCurtida}>
            <img className="w-[24px]" src={curtido ? curtirVermelho : curtir} alt="Curtir" />
            <p>{nCurtidas}</p>
          </button>
          <button className="flex gap-2">
            <img src={comentar} alt="Comentar" />
            <p>{avaliacao.nComentarios}</p>
          </button>
          <p className="ml-auto text-[#505050]">{avaliacao.data}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {avaliacao.tags.map((tag, index) => (
            <button
              key={index}
              className="px-2 rounded-full"
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
