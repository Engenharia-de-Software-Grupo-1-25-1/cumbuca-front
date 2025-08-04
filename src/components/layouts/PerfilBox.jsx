//Box que armazena perfil de estabelecimento ou de usuário
// É possível definir o nome do usuário exibido, seu username e sua foto de perfil através dos parâmetros
function PerfilBox({ fotoDePerfil, nomeUsuario, usernameUsuario }) {
  return (
    <div className="bg-[#bc6302] w-[80%] rounded-[10px] p-8 md:ml-16 lg:ml-16 sm:mx-auto md:mx-4 lg:mx-4">
      <div className="flex flex-start flex-wrap">
        <img src={fotoDePerfil} className="h-[50px] sm:h-[50px] md:h-[75px] lg:h-[95px] rounded-full" />
        <div className="self-center ml-[1em] sm:ml-[1em] md:ml-[2em] lg:ml-[4em]">
          <h1 className="font-semibold text-[24px] sm:text-[24px] md:text-[36px] lg:text-[48px]">{nomeUsuario}</h1>
          <h2 className="font-normal text-[16px] sm:text-[16px] md:text-[20px] lg:text-[24px]">{usernameUsuario}</h2>
        </div>
      </div>
    </div>
  );
}

export default PerfilBox;
