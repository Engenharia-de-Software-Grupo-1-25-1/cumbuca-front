import Header from '../components/headers/Header2';
import NavBar from '../components/layouts/NavBar';
import ListaEstabelecimentos from '../components/ListaDeEstabelecimentos';
import { getEstabelecimentos } from '../services/EstabelecimentoService';
import { getUsuarioPorUsername } from '../services/usuarioService';

function EstabelecimentosFiltrados() {
  //esperando requisição certa
  const estabelecimentosFiltados = getEstabelecimentos;

  return (
    <div>
      <Header />
      <div className="flex gap-4 justify-center ml-0 sm:ml-0 md:ml-4 lg:ml-4 no-scrollbar overflow-y-scroll max-h-[calc(118vh-250px)] m-4">
        <ListaEstabelecimentos arrayEstabelecimentos={estabelecimentosFiltados} />
      </div>
    </div>
  );
}

export default EstabelecimentosFiltrados;
