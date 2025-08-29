import Header from '../components/headers/Header2';
import NavBar from '../components/layouts/NavBar';
import ListaEstabelecimentos from '../components/ListaDeEstabelecimentos';
import { getEstabelecimentos } from '../services/EstabelecimentoService';
import '../styles/index.css';
import { useState } from 'react';

function Layout() {
  const [filtros, setFiltros] = useState({});
  const [ordenador, setOrdenador] = useState(null);

  const handleAplicarFiltros = (novosFiltros, novaOrdenacao) => {
    setFiltros(novosFiltros);
    setOrdenador(novaOrdenacao);
  };

  return (
    <>
      <Header onAplicarFiltros={handleAplicarFiltros} />
      <div className="max-w-6xl mx-auto px-0 sm:px-0 md:px-4 lg:px-4">
        <NavBar />
        <div className="flex gap-4 justify-center ml-0 sm:ml-0 md:ml-4 lg:ml-4 mb-8 no-scrollbar overflow-y-scroll max-h-[calc(100vh-250px)]">
          <ListaEstabelecimentos arrayEstabelecimentos={getEstabelecimentos} filtros={filtros} ordenador={ordenador} />
        </div>
      </div>
    </>
  );
}

export default Layout;
