import Header from '../headers/Header3';
import '../../styles/layouts/Layout5.css';

//Layout Padrão com Header de busca, filtragem e resultado de busca
//É possível definir um placeholder para a barra de pesquisa, e o texto do resultado da busca
//function Layout({ placeholder, resultadoBusca }) {
function Layout({ placeholder = 'Pesquisar...', resultadoBusca = 'busca' }) {
  return (
    <>
      <Header placeholder={placeholder} />
      <h1 className="resultadoBuscaBox">
        Resultado da busca: "{resultadoBusca}"
      </h1>
    </>
  );
}

export default Layout;
