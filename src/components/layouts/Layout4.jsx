import Header from '../headers/Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';
import PerfilBox from './PerfilBox';
import '../../styles/layouts/Layout4.css';

//Layout Padrão com Header simples, Tags Populares e box de Perfil
function Layout4({ tags, nomeUsuario, usernameUsuario, fotoDePerfil }) {
  return (
    <>
      <Header />
      <NavBar />
      <div className="conteudo">
        <PerfilBox
          nomeUsuario={nomeUsuario}
          usernameUsuario={usernameUsuario}
          fotoDePerfil={fotoDePerfil}
        />
        <TagsPopulares tags={tags} />
      </div>
    </>
  );
}

export default Layout4;
