import LayoutBase from './Layout3';
import PerfilBox from './PerfilBox';

//Layout Padrão com Header completo, Tags Populares e box de Perfil
// É possível definir o usuário exibido
function Layout({ usuario, loadingUsuario, onAtualizarTags }) {
  return (
    <>
      <LayoutBase
        Conteudo={PerfilBox}
        conteudoProps={{
          usuario,
          loadingUsuario,
          onAtualizarTags,
        }}
      />
    </>
  );
}

export default Layout;
