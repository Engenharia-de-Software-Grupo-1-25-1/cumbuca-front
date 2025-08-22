import { FaHashtag } from "react-icons/fa6";

//Box de tag popular, cada tag apresenta um ícone, seu nome e seu número de publicações
//As cores do componente são definidas pelos parâmetros corFundo e corDestaque
function TagBox({ tag, corFundo, corDestaque }) {
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
      <FaHashtag color={corDestaque} size="30" />
      <p className="text-[#1e1e1e] font-medium text-[18px]">{tag.tag}</p>
      <p
        className="text-[#fefefe] rounded-xl px-2.5 py-0.5 text-[18px] ml-auto sm:ml-0 md:ml-0 lg:ml-auto sm:text-center"
        style={{ backgroundColor: corDestaque }}
      >
        {tag.quantidade}
      </p>
    </button>
  );
}

export default TagBox;
