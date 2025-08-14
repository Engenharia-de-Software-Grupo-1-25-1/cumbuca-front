import { useLocation } from 'react-router-dom';
import AvaliacaoBox from '../layouts/AvaliacaoBox';
import { usuarios } from '../temporario/avaliacoesEUsuarios';
import { MdOutlineEdit } from 'react-icons/md';

//Box que armazena perfil de estabelecimento ou de usuário
// É possível definir o usuário exibido
export default function PerfilBox({ usuario }) {
  const location = useLocation();
  const isMeuPerfil = location.pathname === '/meuPerfil';
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  //Verifica se url é /meuPerfil para carregar o perfil do usuário logado
  if (isMeuPerfil) {
    usuario = usuarios.find(u => u.username === usuarioLogado.username);
  }

  return (
    <div className="bg-[#bc6302] w-[80%] rounded-[10px] p-8 md:ml-16 lg:ml-16 sm:mx-auto md:mx-4 lg:mx-4 mb-8 relative">
      {usuario ? (
        <>
          {/* Informações do usuário */}

          <div className="flex flex-wrap justify-between">
            <img
              src={usuario.fotoDePerfil}
              className="h-[50px] sm:h-[50px] md:h-[75px] lg:h-[95px] rounded-full"
              alt={`Foto de perfil de ${usuario.nome}`}
            />
            <div className="self-center ml-[1em] sm:ml-[1em] md:ml-[2em] lg:ml-[4em] mr-auto">
              <h1 className="font-semibold text-[24px] sm:text-[24px] md:text-[36px] lg:text-[48px]">{usuario.nome}</h1>
              <h2 className="font-normal text-[16px] sm:text-[16px] md:text-[20px] lg:text-[24px]">
                @{usuario.username}
              </h2>
            </div>
            {usuarioLogado.username === usuario.username && (
              // Botão de editar
              <button className="self-end mb-auto">
                <MdOutlineEdit alt="Editar Perfil" size={36} color="#F4E9C3" />
              </button>
            )}
          </div>
          <div>
            {/* Avaliações do usuário */}

            {usuario.avaliacoesUsuario.length > 0 ? (
              usuario.avaliacoesUsuario.map((avaliacao, index) => <AvaliacaoBox key={index} avaliacao={avaliacao} />)
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
