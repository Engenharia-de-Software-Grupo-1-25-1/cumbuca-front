import LayoutBase from './Layout3';
import PerfilBox from './PerfilBox';
import usuarios from '../../components/temporario/usuarios';

const usuarioTeste = usuarios[0];

//Layout Padrão com Header completo, Tags Populares e box de Perfil
// É possível definir o nome do usuário exibido, seu username e sua foto de perfil através dos parâmetros
function Layout({ usuario = usuarioTeste }) {
  return (
    <>
      <LayoutBase
        Conteudo={PerfilBox}
        conteudoProps={{
          usuario,
        }}
      />
    </>
  );
}

export default Layout;
