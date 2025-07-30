import Header from '../headers/Header1';
import '../styles/layouts/Layout1.css';

//Layout Padrão com Título e Subtítulo
//É possível dizer qual o subtitulo a partir do parâmetro
function Layout1({ subtitulo }) {
  return (
    <>
      <Header />
      <h2>{subtitulo}</h2>
    </>
  );
}

export default Layout1;
