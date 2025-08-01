import cumbucaLogo from '../../assets/logo.svg';
import sair from '../../assets/sair.svg';
import pesquisar from '../../assets/pesquisar.svg';
import filtrar from '../../assets/filtrar.svg';
import limparBusca from '../../assets/limpar_busca.svg';

//Padrão de Header com logo, barra de pesquisa, botão de filtrar e botão de sair
function Header({ placeholder }) {
  return (
    <header className="flex items-center justify-between gap-4 bg-[url('../assets/fundo_header.svg')] border-b-[0.5em] border-[#db520a] py-4 px-10 lg:px-20 h-[10%]">
      <a
        href="/"
        className="flex items-center gap-4 sm:ml-0 md:ml-4 lg:ml-20 flex-shrink-0"
      >
        <img
          src={cumbucaLogo}
          className="w-16 transition-transform duration-200 hover:scale-110"
          alt="Logo da Cumbuca"
        />
      </a>

      <div className="flex items-center bg-[#f5dfb6] border border-[#db520a] rounded-full sm:px-0 md:px-4 lg:px-4 py-2 w-full max-w-4xl">
        <img
          src={pesquisar}
          alt="Pesquisar"
          className="w-[30px] hidden sm:block ml-4"
        />
        <input
          type="search"
          placeholder={placeholder}
          id="inputPesquisa"
          className="w-full bg-transparent border-none outline-none font-poppins sm:text-[20px] md:text-[24px] lg:text-[32px] text-[#1e1e1e] px-4"
          onInput={toggleClearBtn}
        />
        <button className="botaoLimpar hidden mr-2" onClick={clearInput}>
          <img src={limparBusca} alt="Limpar Pesquisa" className="w-[30px]" />
        </button>
      </div>

      <div className="flex gap-1 sm:gap-1 md:gap-4 lg:gap-4 ml-0 sm:ml-0 md:ml-4 lg:ml-4">
        <button className="flex-shrink-0">
          <img
            src={filtrar}
            className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px] "
            alt="Filtrar"
          />
        </button>
        <button className="flex-shrink-0">
          <img
            src={sair}
            className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px] "
            alt="Sair"
          />
        </button>
      </div>
    </header>
  );
}

function toggleClearBtn() {
  const input = document.getElementById('inputPesquisa');
  const btn = document.querySelector('.botaoLimpar');
  btn.style.display = input.value ? 'block' : 'none';
}

function clearInput() {
  const input = document.getElementById('inputPesquisa');
  input.value = '';
  toggleClearBtn();
  input.focus();
}

export default Header;
