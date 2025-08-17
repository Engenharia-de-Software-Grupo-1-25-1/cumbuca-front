import Header from '../headers/Header2';
import NavBar from './NavBar';

//Layout Padrão com Header completo sem as tags populares.
//Utilizado para exibir os estabelecimentos
function Layout({ Conteudo, conteudoProps }) {
  return (
    <>
      <Header />
      <NavBar />
      <div className="w-[80%] sm:w-[80%] md:w-[85%] lg:w-[80%] mx-auto md:mx-4 lg:mx-4 md:ml-16 lg:ml-16">
        {Conteudo ? <Conteudo {...conteudoProps} /> : null}
      </div>
    </>
  );
}

export default Layout;