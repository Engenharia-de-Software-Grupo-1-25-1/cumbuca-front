import { useEffect, useState } from 'react';
import AvaliacaoBox from '../layouts/AvaliacaoBox';
import { MdOutlineEdit } from 'react-icons/md';
import { DataView } from 'primereact/dataview';
import { getAvaliacoesUsuario } from '../../services/avaliacoesService';

//Box que armazena perfil de estabelecimento ou de usuário
//É possível definir o usuário exibido
export default function PerfilBox({ usuario }) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    async function carregarAvaliacoes() {
      if (!usuarioExibido) return;

      try {
        const { data } = await getAvaliacoesUsuario(usuarioExibido.id);
        setAvaliacoes(data);
      } catch (error) {
        console.error('Erro ao carregar avaliações', error);
        setAvaliacoes([]); // fallback
      }
    }

    carregarAvaliacoes();
  }, [usuarioExibido]);

  return (
    <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 relative max-w-[728px]">
      {usuarioExibido ? (
        <>
          {/* Informações do usuário */}
          <div className="flex flex-wrap justify-between">
            <img
              src={usuarioExibido.fotoDePerfil}
              className="h-[50px] sm:h-[50px] md:h-[75px] lg:h-[75px] rounded-full"
              alt={`Foto de perfil de ${usuarioExibido.nome}`}
            />
            <div className="self-center ml-[1em] sm:ml-[1em] md:ml-[2em] lg:ml-[4em] mr-auto">
              <h1 className="font-semibold text-[24px] sm:text-[24px] md:text-[36px] lg:text-[36px]">
                {usuarioExibido.nome}
              </h1>
              <h2 className="font-normal text-[16px] sm:text-[16px] md:text-[20px] lg:text-[20px]">
                @{usuarioExibido.username}
              </h2>
            </div>
            {usuarioLogado.username === usuarioExibido.username && (
              <button className="self-end mb-auto">
                <MdOutlineEdit alt="Editar Perfil" size={36} color="#F4E9C3" />
              </button>
            )}
          </div>

          {/* Avaliações do usuário */}
          <div>
            {avaliacoes.length > 0 ? (
              <DataView
                value={avaliacoes}
                itemTemplate={(avaliacao, index) => <AvaliacaoBox key={index} avaliacao={avaliacao} />}
                layout="list"
                style={{ maxHeight: '500px', overflowY: 'auto' }}
                className="scroll-dark mt-8"
              />
            ) : (
              <h1 className="sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto absolute top-0 left-0 right-0 bottom-0">
                Este usuário ainda não possui avaliações.
              </h1>
            )}
          </div>
        </>
      ) : (
        <h1 className="sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto absolute top-0 left-0 right-0 bottom-0">
          Usuário não encontrado.
        </h1>
      )}
    </div>
  );
}
