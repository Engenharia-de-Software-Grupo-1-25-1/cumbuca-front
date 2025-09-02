import { useState, useRef } from 'react';
import Header from '../components/headers/Header2';
import NavBar from '../components/layouts/NavBar';
import TagsPopulares from '../components/layouts/TagsPopulares';
import FeedConteudo from '../components/layouts/FeedConteudo';

export default function Feed() {
  const [filtros, setFiltros] = useState({});
  const [ordenador, setOrdenador] = useState(null);

  const feedRef = useRef(null);

  const handleAplicarFiltros = (novosFiltros, novaOrdenacao) => {
    setFiltros(novosFiltros);
    setOrdenador(novaOrdenacao);
  };

  return (
    <>
      <Header
        onAplicarFiltros={handleAplicarFiltros}
        onChange={() => feedRef.current?.fetchAll?.()}
        filtros={filtros}
        ordenador={ordenador}
      />
      <div className="max-w-6xl mx-auto px-0 sm:px-0 md:px-4 lg:px-4">
        <NavBar />
        <div className="flex gap-4 justify-center ml-0 sm:ml-0 md:ml-4 lg:ml-4 mb-8">
          <FeedConteudo ref={feedRef} filtros={filtros} ordenador={ordenador} />
          <TagsPopulares />
        </div>
      </div>
    </>
  );
}
