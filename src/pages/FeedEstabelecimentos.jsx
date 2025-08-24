import Header from '../components/headers/Header2';
import NavBar from '../components/layouts/NavBar';
import ListaEstabelecimentos from '../components/ListaDeEstabelecimentos';
import { getEstabelecimentos } from '../services/EstabelecimentoService';
import '../styles/index.css';

function Layout() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <NavBar />
      </div>
      <div
        style={{ height: 'calc(100vh - 12rem)' }}
        className="w-[80%] sm:w-[80%] md:w-[85%] lg:w-[65%] justify-self-center sm:justify-self-center md:justify-self-auto ld:justify-self-auto ml-0 sm:ml-0 md:ml-4 lg:ml-4 overflow-y-scroll no-scrollbar">
        <ListaEstabelecimentos arrayEstabelecimentos={getEstabelecimentos} />
      </div>
    </>
  );
}

export default Layout;