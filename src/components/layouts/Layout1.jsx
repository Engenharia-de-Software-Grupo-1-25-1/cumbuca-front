import Header from '../headers/Header1';

//Layout Padrão com Título e Subtítulo
//É possível dizer qual o subtitulo a partir do parâmetro
function Layout({ subtitulo = 'Login' }) {
  return (
    <>
      <Header />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5DFB6] mb-6 text-center">
        {subtitulo}
      </h2>
    </>
  );
}

export default Layout;
