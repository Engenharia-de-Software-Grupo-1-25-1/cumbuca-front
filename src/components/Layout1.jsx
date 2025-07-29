import Header from './Header1';
import '../styles/Layout1.css';

//Layout Padrão com Título e Subtítulo
function Layout1({ subtitulo }) {
  return (
    <>
      <Header />
      <h2>{subtitulo}</h2>
    </>
  );
}

export default Layout1;
