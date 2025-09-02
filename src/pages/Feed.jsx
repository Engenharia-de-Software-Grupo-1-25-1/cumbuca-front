import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/headers/Header2';
import NavBar from '../components/layouts/NavBar';
import TagsPopulares from '../components/layouts/TagsPopulares';
import FeedConteudo from '../components/layouts/FeedConteudo';

export default function Feed() {
  const location = useLocation();
  const tagInicial = location.state?.tagInicial;
  const [filtros, setFiltros] = useState(tagInicial ? { tags: [tagInicial] } : {});
  const [ordenador, setOrdenador] = useState(null);
  const feedRef = useRef(null);

  useEffect(() => {
    if (tagInicial) {
      setFiltros({ tags: [tagInicial] });
    }
  }, [tagInicial]);

  const handleAplicarFiltros = (novosFiltros, novaOrdenacao) => {
    setFiltros(novosFiltros);
    setOrdenador(novaOrdenacao);
  };

  const handleSelecionarTag = tag => {
    setFiltros(prev => {
      if (prev.tags?.[0] === tag) return prev;
      return { ...prev, tags: [tag] };
    });

    setTimeout(() => feedRef.current?.fetchAll?.(), 0);
  };

  return (
    <>
      <Header
        onAplicarFiltros={handleAplicarFiltros}
        filtros={filtros}
        ordenador={ordenador}
        onChange={() => feedRef.current?.fetchAll?.()}
      />

      <div className="max-w-6xl mx-auto px-0 sm:px-0 md:px-4 lg:px-4">
        <NavBar />
        <div className="flex gap-4 justify-center ml-0 sm:ml-0 md:ml-4 lg:ml-4 mb-8">
          <FeedConteudo ref={feedRef} filtros={filtros} ordenador={ordenador} onSelecionarTag={handleSelecionarTag} />
          <TagsPopulares onSelecionarTag={handleSelecionarTag} />
        </div>
      </div>
    </>
  );
}
