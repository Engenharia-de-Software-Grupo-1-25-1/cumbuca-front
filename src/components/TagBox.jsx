import '../styles/TagBox.css';
import Icone from './Icone.jsx'

function TagBox({ icone, nomeTag, nPublicacoes, corFundo, corDestaque }) {
  return (
    <button
      className="tagBox"
      style={{ backgroundColor: corFundo, borderColor: corDestaque }}
    >
      <Icone url={icone} cor={corDestaque} tamanho="30px" />
      <p className="nomeTag">{nomeTag}</p>
      <p className="nPublicacoes" style={{ backgroundColor: corDestaque }}>
        {nPublicacoes}
      </p>
    </button>
  );
}

export default TagBox;
