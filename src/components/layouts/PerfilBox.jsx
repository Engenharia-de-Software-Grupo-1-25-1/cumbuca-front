import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/useAuth';
import AvaliacaoBox from '../layouts/AvaliacaoBox';
import { MdOutlineEdit } from 'react-icons/md';
import { DataView } from 'primereact/dataview';
import { getAvaliacoesUsuario } from '../../services/avaliacaoService';

// Box que armazena perfil de estabelecimento ou de usuário
// É possível definir o usuário exibido
export default function PerfilBox({ usuario }) {
  const { user } = useAuth();
  const ehMeuPerfil = useState(usuario ? user.id === usuario.id : false);

  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    async function carregarAvaliacoes() {
      if (!usuario) return;

      try {
        const { data } = await getAvaliacoesUsuario(usuario.id);
        setAvaliacoes(data);
      } catch (error) {
        console.error('Erro ao carregar avaliações', error);
        setAvaliacoes([]);
      }
    }

    carregarAvaliacoes();
  }, [usuario]);

  return (
    <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col">
      {usuario ? (
        <>
          {/* Informações do usuário */}
          <div className="flex flex-wrap justify-between">
            <img
              src={`data:image/jpeg;base64,${usuario.foto}`}
              className="h-[50px] sm:h-[50px] md:h-[75px] lg:h-[75px] rounded-full"
              alt={`Foto de perfil de ${usuario.nome}`}
            />
            <div className="self-center ml-[1em] sm:ml-[1em] md:ml-[2em] lg:ml-[4em] mr-auto">
              <h1 className="font-semibold text-[24px] sm:text-[24px] md:text-[36px] lg:text-[36px]">{usuario.nome}</h1>
              <h2 className="font-normal text-[16px] sm:text-[16px] md:text-[20px] lg:text-[20px]">
                @{usuario.username}
              </h2>
            </div>
            {ehMeuPerfil && (
              <button className="self-end mb-auto">
                <MdOutlineEdit alt="Editar Perfil" size={36} color="#F4E9C3" />
              </button>
            )}
          </div>

          {/* Avaliações do usuário */}
          {avaliacoes.length > 0 ? (
            <DataView
              value={avaliacoes}
              itemTemplate={(avaliacao, index) => <AvaliacaoBox key={index} avaliacao={avaliacao} />}
              layout="list"
              style={{ maxHeight: '500px', overflowY: 'auto' }}
              className="scroll-dark mt-8"
            />
          ) : (
            <h1 className="sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-8 sm:mt-8 md:mt-auto lg:mt-auto">
              Este usuário ainda não possui avaliações.
            </h1>
          )}
        </>
      ) : (
        <h1 className="text-center sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto">
          Usuário não encontrado.
        </h1>
      )}
    </div>
  );
}
