import LayoutBase from './Layout2';

//Layout Padrão com Header de busca, filtragem e resultado de busca
//É possível definir um placeholder para a barra de pesquisa, e o texto do resultado da busca
function Layout({ placeholder = 'Pesquisar Estabelecimentos...', resultadoBusca = 'busca' }) {
  return (
    <>
      <LayoutBase placeholder={placeholder} />
      <h1 className="sm:text-[20px] md:text-[30px] lg:text-[40px] font-semibold text-[#1e1e1e] m-8 p-1 px-4 bg-[#f4a831] w-fit rounded-[10px]">
        Resultado da busca: "{resultadoBusca}"
      </h1>
    </>
  );
}

export default Layout;
