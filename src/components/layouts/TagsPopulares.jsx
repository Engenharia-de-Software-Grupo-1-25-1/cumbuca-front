import TagBox from './TagBox';
import { coresTags } from '../temporario/tags';

//Container de Tags Populares ordenadas de mais a menos publicações
//Receb o parâmetro tags, uma lista de tags que serão apresentadas em Tags Populares
function TagsPopulares({ tags }) {
  return (
    <ul className="bg-[#f7d799] rounded-xl flex flex-col text-center items-center w-[22%] md:w-auto p-4 gap-4 hidden sm:hidden md:flex lg:flex h-fit mr-4 sm:ml-0 md:ml-0 lg:ml-8">
      <h1 className="text-[#d4490c] font-semibold leading-tight text-4xl">Tags Populares</h1>
      {[...tags]
        .sort((a, b) => b.nPublicacoes - a.nPublicacoes)
        .map((tag, index) => {
          const cor = coresTags[index];
          return (
            <li key={index} className="w-full">
              <TagBox
                nomeTag={tag.nome}
                nPublicacoes={tag.nPublicacoes}
                corFundo={cor?.corFundo}
                corDestaque={cor?.corDestaque}
              />
            </li>
          );
        })}
    </ul>
  );
}

export default TagsPopulares;
