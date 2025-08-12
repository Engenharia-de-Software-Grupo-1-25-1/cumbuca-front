import { useState } from 'react';
import estabelecimentoIcon from '../../assets/estabelecimentos.svg';
import Icone from '../util/Icone';
import mais from '../../assets/mais.svg';
import estrela from '../../assets/estrelaBox.svg';
import curtir from '../../assets/curtir.svg';
import curtirVermelho from '../../assets/curtirVermelho.svg';
import comentar from '../../assets/comentar.svg';

export default function AvalicaoBox({ avaliacao }) {
  const [curtido, setCurtido] = useState(avaliacao.curtido);
  const [nCurtidas, setNCurtidas] = useState(avaliacao.nCurtidas); // estado para o contador

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
        <a href="#">
          <img
            src={avaliacao.autor.fotoDePerfil}
            className="h-[65px] rounded-full"
            alt={`Foto de perfil de ${avaliacao.autor.nome}`}
          />
        </a>
        <div>
          <a href="#" className="flex gap-4">
            <p>{avaliacao.autor.nome}</p>
            <p className="text-xl text-[#505050]">@{avaliacao.autor.username}</p>
          </a>
          <a href="#" className="flex text-xl items-center gap-1">
            <Icone url={estabelecimentoIcon} cor="#356B2A" tamanho="24px" />
            <p className="text-xl text-[#356B2A]">{avaliacao.estabelecimento}</p>
          </a>
        </div>
        <div className="flex items-end self-start ml-auto">
          <img src={estrela} className="w-[48px] self-baseline" alt="Nota da Avaliação" />
          <p className="text-3xl text-[#FFB115]">{avaliacao.nota}</p>
        </div>
        <button className="self-start">
          <img src={mais} alt="Mais opções" />
        </button>
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
