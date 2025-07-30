import Header from '../headers/Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';
import PerfilBox from './PerfilBox';
import fotoDePerfil from '../../assets/fotoDePerfil.jpg';
import tags from '../temporario/tags';
import '../../styles/layouts/Layout4.css';

//Layout Padrão com Header simples, Tags Populares e box de Perfil
//function Layout({ tags, nomeUsuario, usernameUsuario, fotoDePerfil }) {
//function Layout({ nomeUsuario, usernameUsuario, fotoDePerfil }) {
function Layout({ nomeUsuario = 'Teste', usernameUsuario = '@teste' }) {
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

export default Layout;
