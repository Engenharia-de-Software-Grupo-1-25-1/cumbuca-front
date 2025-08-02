import LayoutBase from './Layout3';
import PerfilBox from './PerfilBox';
import fotoDePerfil from '../../assets/fotoDePerfil.jpg';

//Layout Padrão com Header simples, Tags Populares e box de Perfil
// É possível definir o nome do usuário exibido, seu username e sua foto de perfil através dos parâmetros
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
