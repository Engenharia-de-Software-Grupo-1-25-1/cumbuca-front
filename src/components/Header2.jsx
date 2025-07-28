import cumbucaLogo from '../assets/logo.svg';
import sair from '../assets/sair.svg';
import '../styles/Header2.css';

function Header() {
  return (
    /* Cria o segundo padrão de Header */
    <header>
      <a href="/" className="logoContainer">
        <img src={cumbucaLogo} className="logo" alt="Logo da Cumbuca" />
        <h1>CUMBUCA</h1>
      </a>
      <button>
        <img src={sair} className="sair" alt="Sair"></img>
      </button>
    </header>
  );
}

export default Header;
