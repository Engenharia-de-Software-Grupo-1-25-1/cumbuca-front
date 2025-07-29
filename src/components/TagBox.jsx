import '../styles/TagBox.css';

function TagBox({ icone, nomeTag, nPublicacoes, corFundo, corDestaque }) {
  return (
    <button
      className="tagBox"
      style={{ backgroundColor: corFundo, borderColor: corDestaque }}
    >
      <img src={icone} className="iconeTag" />
      <p className="nomeTag">{nomeTag}</p>
      <p className="nPublicacoes" style={{ backgroundColor: corDestaque }}>
        {nPublicacoes}
      </p>
    </button>
  );
}

export default TagBox;
