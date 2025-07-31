import cumbucaLogo from '../../assets/logo.svg';
import sair from '../../assets/sair.svg';
import pesquisar from '../../assets/pesquisar.svg';
import filtrar from '../../assets/filtrar.svg';
import limparBusca from '../../assets/limpar_busca.svg';
import '../../styles/headers/Header3.css';

function Header({ placeholder }) {
  return (
    /* Padrão de Header com logo, barra de pesquisa, botão de filtrar e botão de sair */
    <header>
      <a href="/" className="logoContainer">
        <img src={cumbucaLogo} className="logo" alt="Logo da Cumbuca" />
      </a>
      <div className="pesquisaContainer">
        <img src={pesquisar} alt="Pesquisar" className="iconePesquisar"></img>
        <input
          type="search"
          placeholder={placeholder}
          id="inputPesquisa"
          onInput={toggleClearBtn}
        />
        <button class="botaoLimpar" onClick={clearInput}>
          <img
            src={limparBusca}
            alt="Limpar Pesquisa"
            className="iconeLimpar"
          />
        </button>
      </div>
      <div className="botoes">
        <button>
          <img src={filtrar} className="filtrar" alt="Filtrar"></img>
        </button>
        <button>
          <img src={sair} className="sair" alt="Sair"></img>
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
