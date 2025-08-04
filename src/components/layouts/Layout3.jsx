import Header from '../headers/Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';
import tags from '../temporario/tags';

//Layout Padrão com Header completo e Tags Populares
//É possível definir o conteúdo que do lado esquerdo do Layout utilizando o parâmetro Conteudo
//Atributos de Conteudo são definidos em conteudoProps
function Layout({ Conteudo, conteudoProps }) {
  return (
    <>
      <Header />
      <NavBar />
      <div className="flex justify-center">
        {Conteudo ? <Conteudo {...conteudoProps} /> : null}
        <TagsPopulares tags={tags} />
      </div>
    </>
  );
}

export default Layout;
