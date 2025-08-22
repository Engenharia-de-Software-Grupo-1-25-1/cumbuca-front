import Header from '../components/headers/Header2';
import NavBar from '../components/layouts/NavBar';
import ListaEstabelecimentos from '../components/ListaDeEstabelecimentos';
import { getEstabelecimentos } from '../services/EstabelecimentoService';

//Layout Padrão com Header completo sem as tags populares.
//Utilizado para exibir os estabelecimentos
function Layout() {
  return (
    <>
      <Header />
      <NavBar />
      <div className="w-[80%] sm:w-[80%] md:w-[85%] lg:w-[80%] mx-auto md:mx-4 lg:mx-4 md:ml-16 lg:ml-16">
        <ListaEstabelecimentos arrayEstabelecimentos={getEstabelecimentos} />
      </div>
    </>
  );
}

export default Layout;