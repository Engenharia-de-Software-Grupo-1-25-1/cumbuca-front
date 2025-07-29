import '../styles/TagsPopulares.css';
import TagBox from './TagBox';

//Container de Tags Populares
function TagsPopulares({ tags }) {
  return (
    <ul className="tagsPopulares">
      <h1 className="tagsPopularesTitulo">Tags Populares</h1>
      {[...tags]
        .sort((a, b) => b.nPublicacoes - a.nPublicacoes)
        .map((tag, index) => (
          <li key={index}>
            <TagBox
              icone={tag.icone}
              nomeTag={tag.nome}
              nPublicacoes={tag.nPublicacoes}
              corFundo={tag.corFundo}
              corDestaque={tag.corDestaque}
            />
          </li>
        ))}
    </ul>
  );
}

export default TagsPopulares;
