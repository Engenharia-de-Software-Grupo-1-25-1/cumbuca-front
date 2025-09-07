import AvaliacaoBox from '../layouts/AvaliacaoBox';
import { getEstabelecimentoById, favoritarEstabelecimento } from '../../services/EstabelecimentoService';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineStarPurple500, MdOutlineLocationOn } from 'react-icons/md';
import { getEstabelecimentoImagem } from '../../utils/imagensCategoriasMapper';
import { formataInfosEstabelecimento } from '../../utils/formataInfosEstabelecimento';
import { useEffect, useState, useCallback } from 'react';
import { message } from 'antd';
import { DataView } from 'primereact/dataview';
import { getAvaliacoesEstabelecimento } from '../../services/avaliacaoService';

export default function EstabelecimentoBox({ estabelecimentoId, onAtualizarTags }) {
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [loadingEstabelecimento, setLoadingEstabelecimento] = useState(true);

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(false);

  const [curtido, setCurtido] = useState(false);

  useEffect(() => {
    async function carregarEstabelecimento() {
      if (!estabelecimentoId) {
        setLoadingEstabelecimento(false);
        return;
      }

      setLoadingEstabelecimento(true);
      try {
        const data = await getEstabelecimentoById(estabelecimentoId);
        setEstabelecimento(data);
        if (data && data.isFavoritado !== undefined) {
          setCurtido(data.isFavoritado);
        }
      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar estabelecimento!');
        setEstabelecimento(null);
      } finally {
        setLoadingEstabelecimento(false);
      }
    }

    carregarEstabelecimento();
  }, [estabelecimentoId]);

  const { id, nome, categoria, notaGeral, rua, numero, bairro, cidade, estado, cep } = estabelecimento || {};
  const { categoriaMapeada, notaFormatada, localizacao } = estabelecimento
    ? formataInfosEstabelecimento(categoria, notaGeral, rua, numero, bairro, cidade, estado, cep)
    : {};
  const estabImagem = estabelecimento ? getEstabelecimentoImagem(categoriaMapeada) : null;

  const carregarAvaliacoes = useCallback(async () => {
    if (!estabelecimento) return;

    setLoadingAvaliacoes(true);
    try {
      const { data } = await getAvaliacoesEstabelecimento(estabelecimento.id);
      setAvaliacoes(data);
    } catch (error) {
      console.error(error);
      message.error('Erro ao carregar avaliações!');
      setAvaliacoes([]);
    } finally {
      setLoadingAvaliacoes(false);
    }
  }, [estabelecimento]);

  useEffect(() => {
    carregarAvaliacoes();
  }, [carregarAvaliacoes]);

  const handleFavoritar = async () => {
    try {
      await favoritarEstabelecimento(id);
      setCurtido(!curtido);
    } catch (error) {
      console.error(error);
      message.error('Erro ao favoritar estabelecimento!');
    }
  };

  if (loadingEstabelecimento) {
    return (
      <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col animate-pulse">
        <div className="flex items-center flex-wrap justify-between">
          <div className="h-[50px] sm:h-[60px] md:h-[90px] lg:h-[120px] w-[50px] sm:w-[60px] md:w-[90px] lg:w-[120px] rounded-full bg-[#f4a831]" />
          <div className="flex flex-col ml-[1em] mr-auto">
            <div className="h-6 w-40 bg-[#f4a831] rounded mb-2" />
            <div className="h-4 w-28 bg-[#f4a831] rounded" />
          </div>
        </div>
        <div className="mt-8 h-6 w-full bg-[#f4a831] rounded" />
        <div className="mt-2 h-6 w-full bg-[#f4a831] rounded" />
      </div>
    );
  }

  if (!estabelecimento) {
    return (
      <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col">
        <h1 className="text-center sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto">
          Estabelecimento não encontrado.
        </h1>
      </div>
    );
  }

  return (
    <div
      className="bg-[#bc6302] w-[80%] sm:w-[80%] md:w-[60%] lg:w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col max-h-[80vh] sm:max-h-[80vh] md:max-h-[80vh] lg:max-h-[72vh]"
      style={{ minHeight: 'calc(100vh - 220px)' }}
    >
      <div className="flex items-center p-0">
        <img
          src={estabImagem}
          className="flex-shrink-0 h-[50px] sm:h-[60px] md:h-[90px] lg:h-[120px] w-[50px] sm:w-[60px] md:w-[90px] lg:w-[120px] rounded-full border-8 border-[#af5921] object-fill"
        />
        <div className="flex-grow ml-4 min-w-0">
          <div className="flex items-center justify-between gap-3 ">
            <div className="flex items-center min-w-0">
              <h1 className="font-bold flex-grow break-words min-w-0 text-[20px] sm:text-[20px] md:text-[25px] lg:text-[30px] text-black">
                {nome}
              </h1>
              <button className="flex items-center flex-shrink-0 ml-2" onClick={handleFavoritar}>
                {curtido ? <FaHeart size={20} fill="red" /> : <FaHeart size={20} fill="grey" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mt-2 w-full flex-wrap md:no-wrap">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex items-center flex-shrink-0">
                <span className="text-[#ffb115] mt-1 text-2xl">{notaFormatada}</span>
                <MdOutlineStarPurple500 size={35} className="text-[#ffb115] ml-1" />
              </div>

              <h2 className="break-words max-w-[70%] text-[#f7d799] text-[12px] md:text-[12px] lg:text-[16px] whitespace-nowrap flex-shrink-0">
                {categoriaMapeada}
              </h2>
            </div>
            <div className="flex items-center min-w-0 mr-2">
              <MdOutlineLocationOn size={20} className="mr-2 flex-shrink-0 text-[#f7d799]" />
              <span
                className="break-words min-w-0 text-[#f7d799] text-[12px] md:text-[12px] lg:text-[16px]"
                title={localizacao}
              >
                {localizacao}
              </span>
            </div>
          </div>
        </div>
      </div>

      {loadingAvaliacoes ? (
        <h1 className="text-center sm:text-[18px] md:text-[24px] lg:text-[24px] font-medium text-[#1e1e1e] p-2 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-8 animate-pulse">
          Carregando avaliações...
        </h1>
      ) : avaliacoes.length > 0 ? (
        <DataView
          value={avaliacoes}
          itemTemplate={(avaliacao, index) => (
            <AvaliacaoBox
              key={index}
              avaliacao={avaliacao}
              onChange={() => {
                carregarAvaliacoes();
                onAtualizarTags?.();
              }}
            />
          )}
          layout="list"
          style={{ overflowY: 'auto' }}
          className="scroll-dark mt-8"
        />
      ) : (
        <h1 className="sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-8">
          Este estabelecimento ainda não possui avaliações.
        </h1>
      )}
    </div>
  );
}
