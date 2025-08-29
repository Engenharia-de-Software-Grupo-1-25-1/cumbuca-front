import Header from '../components/headers/Header2';
import ListaUsuarios from '../components/ListaDeEstabelecimentos';
function UsuariosFiltrados() {
  //esperando requisição certa
  const usuariosFiltados = getUsuarioPorUsername('adm');

  return (
    <div>
      <Header />
      <div className="flex gap-4 justify-center ml-0 sm:ml-0 md:ml-4 lg:ml-4 no-scrollbar overflow-y-scroll max-h-[calc(118vh-250px)] m-4">
        <ListaUsuarios arrayEstabelecimentos={usuariosFiltados} />
      </div>
    </div>
  );
}

export default UsuariosFiltrados;
