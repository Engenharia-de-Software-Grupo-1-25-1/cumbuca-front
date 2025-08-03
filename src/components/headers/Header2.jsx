import cumbucaLogo from '../../assets/logo.svg';
import sair from '../../assets/sair.svg';

//Padrão de Header com logo e botão de sair
function Header() {
  return (
    <header
      className="
        flex justify-between
        bg-[url('../assets/fundo_header.svg')] bg-cover bg-center
        border-b-[0.5em] border-b-[#db520a]
        h-[10%]
        px-2 py-4 sm:px-2 md:px-8 lg:px-20
        items-center
      "
    >
      <a
        href="/"
        className="flex items-center gap-4 ml-[0em] sm:ml-[0em] md:ml-[2em] lg:ml-[4em]"
      >
        <img
          src={cumbucaLogo}
          alt="Logo da Cumbuca"
          className="
            h-12 sm:h-12 md:h-16 w-auto
            will-change-transform
            transition-filter duration-300
            hover:scale-110 hover:transition-transform hover:duration-200
          "
        />
        <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-[#f5dfb6]">
          CUMBUCA
        </h1>
      </a>

      <button>
        <img src={sair} alt="Sair" className="h-10 sm:h-12 md:h-16 w-auto" />
      </button>
    </header>
  );
}

export default Header;
