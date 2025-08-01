import LayoutBase from './Layout3';
import PerfilBox from './PerfilBox';
import fotoDePerfil from '../../assets/fotoDePerfil.jpg';

//Layout Padrão com Header simples, Tags Populares e box de Perfil
function Layout({ nomeUsuario = 'Teste', usernameUsuario = '@teste' }) {
  return (
    <>
      <LayoutBase
        Conteudo={PerfilBox}
        conteudoProps={{
          nomeUsuario,
          usernameUsuario,
          fotoDePerfil,
        }}
      />
    </>
  );
}

export default Layout;
