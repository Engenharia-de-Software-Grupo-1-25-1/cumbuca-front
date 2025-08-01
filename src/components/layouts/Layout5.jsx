import Header from '../headers/Header3';

function Layout({ placeholder = 'Pesquisar...', resultadoBusca = 'busca' }) {
  return (
    <>
      <Header placeholder={placeholder} />
      <h1 className="sm:text-[20px] md:text-[30px] lg:text-[40px] font-semibold text-[#1e1e1e] m-8 p-1 px-4 bg-[#f4a831] w-fit rounded-[10px]">
        Resultado da busca: "{resultadoBusca}"
      </h1>
    </>
  );
}

export default Layout;
