import Header from '../headers/Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';
import tags from '../temporario/tags';

//Layout Padrão com Header simples e Tags Populares
//function Layout({ tags }) {
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
