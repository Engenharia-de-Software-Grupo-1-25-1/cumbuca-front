import Icone from '../util/Icone';

//Box de tag popular, cada tag apresenta um ícone, seu nome e seu número de publicações
function TagBox({ icone, nomeTag, nPublicacoes, corFundo, corDestaque }) {
  return (
    <button
      className="flex items-center justify-around gap-4 rounded-xl px-2 py-4 w-full"
      style={{
        backgroundColor: corFundo,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: corDestaque,
      }}
    >
      <Icone url={icone} cor={corDestaque} tamanho="30px" />
      <p className="text-[#1e1e1e] font-medium text-[18px]">{nomeTag}</p>
      <p
        className="text-[#fefefe] rounded-xl px-2.5 py-0.5 text-[18px] ml-auto sm:ml-0 md:ml-0 lg:ml-auto sm:text-center"
        style={{ backgroundColor: corDestaque }}
      >
        {nPublicacoes}
      </p>
    </button>
  );
}

export default TagBox;
