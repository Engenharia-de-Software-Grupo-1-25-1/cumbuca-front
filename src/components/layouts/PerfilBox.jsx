import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../features/auth/useAuth';
import AvaliacaoBox from '../layouts/AvaliacaoBox';
import { MdOutlineEdit } from 'react-icons/md';
import { DataView } from 'primereact/dataview';
import { getAvaliacoesUsuario } from '../../services/avaliacaoService';
import fotoDePerfilPadrao from '../../assets/fotoDePerfilPadrao.webp';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

// Box que armazena perfil de estabelecimento ou de usuário
// É possível definir o usuário exibido
export default function PerfilBox({ usuario, loadingUsuario }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ehMeuPerfil = usuario ? user.id === usuario.id : false;

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(false);

  const carregarAvaliacoes = useCallback(async () => {
    if (!usuario) return;

    setLoadingAvaliacoes(true);
    try {
      const { data } = await getAvaliacoesUsuario(usuario.id);
      setAvaliacoes(data);
    } catch (error) {
      console.error(error);
      message.error('Erro ao carregar avaliações!');
      setAvaliacoes([]);
    } finally {
      setLoadingAvaliacoes(false);
    }
  }, [usuario]);

  useEffect(() => {
    carregarAvaliacoes();
  }, [carregarAvaliacoes]);

  if (loadingUsuario) {
    return (
      <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col animate-pulse">
        <div className="flex flex-wrap justify-between">
          <div className="h-[75px] w-[75px] rounded-full bg-[#f4a831]" />
          <div className="flex flex-col ml-[1em] mr-auto">
            <div className="h-6 w-40 bg-[#f4a831] rounded mb-2" />
            <div className="h-4 w-28 bg-[#f4a831] rounded" />
          </div>
          <div className="h-9 w-9 bg-[#f4a831] rounded-full" />
        </div>
        <div className="mt-8 h-6 w-full bg-[#f4a831] rounded" />
        <div className="mt-2 h-6 w-full bg-[#f4a831] rounded" />
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col">
        <h1 className="text-center sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto">
          Usuário não encontrado.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col max-h-[80vh] sm:max-h-[80vh] md:max-h-[80vh] lg:max-h-[72vh]">
      <div className="flex flex-wrap justify-between">
        <img
          src={
            usuario.status === 'ATIVO'
              ? usuario.foto
                ? `data:image/jpeg;base64,${usuario.foto}`
                : fotoDePerfilPadrao
              : fotoDePerfilPadrao
          }
          className="h-[50px] md:h-[75px] w-[50px] md:w-[75px] rounded-full object-cover"
          alt={`Foto de perfil de ${usuario.nome}`}
        />
        <div className="self-center ml-[1em] sm:ml-[1em] md:ml-[2em] lg:ml-[2em] mr-auto min-w-0 max-w-[60%]">
          <h1 className="font-semibold text-[24px] sm:text-[24px] md:text-[36px] lg:text-[36px] leading-[1.2] truncate">
            {usuario.status === 'ATIVO' ? usuario.nome : 'Usuário inativo'}
          </h1>
          <h2 className="font-normal text-[16px] sm:text-[16px] md:text-[20px] lg:text-[20px] truncate">
            {usuario.status === 'ATIVO' ? `@${usuario.username}` : ''}
          </h2>
        </div>
        {ehMeuPerfil && (
          <button
            type="button"
            className="self-end mb-auto hover:opacity-90 focus:outline-none"
            onClick={() => navigate('/perfil/editar')}
            aria-label="Editar Perfil"
          >
            <MdOutlineEdit size={36} color="#F4E9C3" />
          </button>
        )}
      </div>

      {loadingAvaliacoes ? (
        <h1 className="text-center sm:text-[18px] md:text-[24px] lg:text-[24px] font-medium text-[#1e1e1e] p-2 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-8 animate-pulse">
          Carregando avaliações...
        </h1>
      ) : avaliacoes.length > 0 ? (
        <DataView
          value={avaliacoes}
          itemTemplate={(avaliacao, index) => (
            <AvaliacaoBox key={index} avaliacao={avaliacao} onChange={carregarAvaliacoes} />
          )}
          layout="list"
          style={{ overflowY: 'auto' }}
          className="scroll-dark mt-8"
        />
      ) : (
        <h1 className="sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-8">
          Este usuário ainda não possui avaliações.
        </h1>
      )}
    </div>
  );
}
