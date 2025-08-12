import AvaliacaoBox from '../layouts/AvaliacaoBox';
import avaliacoes from '../temporario/avaliacoes';
import editar from '../../assets/editarPerfil.svg';

//Box que armazena perfil de estabelecimento ou de usuário
// É possível definir o nome do usuário exibido, seu username e sua foto de perfil através dos parâmetros
export default function PerfilBox({ usuario }) {
  return (
    <div className="bg-[#bc6302] w-[80%] rounded-[10px] p-8 md:ml-16 lg:ml-16 sm:mx-auto md:mx-4 lg:mx-4 mb-8">
      <div className="flex flex-wrap justify-between">
        <img
          src={usuario.fotoDePerfil}
          className="h-[50px] sm:h-[50px] md:h-[75px] lg:h-[95px] rounded-full"
          alt={`Foto de perfil de ${usuario.nome}`}
        />
        <div className="self-center ml-[1em] sm:ml-[1em] md:ml-[2em] lg:ml-[4em] mr-auto">
          <h1 className="font-semibold text-[24px] sm:text-[24px] md:text-[36px] lg:text-[48px]">{usuario.nome}</h1>
          <h2 className="font-normal text-[16px] sm:text-[16px] md:text-[20px] lg:text-[24px]">@{usuario.username}</h2>
        </div>
        <button className="self-end mb-auto">
          <img src={editar} alt="Editar Perfil"></img>
        </button>
      </div>
      <div>
        {avaliacoes.length > 0 ? (
          avaliacoes.map((avaliacao, index) => <AvaliacaoBox key={index} avaliacao={avaliacao} />)
        ) : (
          <h1 className="sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e] p-1 px-4 bg-[#f4a831] w-fit rounded-[10px] mx-auto mt-10 sm:mt-10 md:mt-20 lg:mt-20">
            Este usuário ainda não possui avaliações.
          </h1>
        )}
      </div>
    </div>
  );
}
